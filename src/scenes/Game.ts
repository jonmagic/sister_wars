import { Scene } from 'phaser'

export class Game extends Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super('Game')
  }

  create() {
    // 1) Set up the background color (sky blue)
    this.cameras.main.setBackgroundColor(0x87ceeb)

    // 2) Add a kitchen wall background
    this.add.sprite(512, 384, 'tile-wall-orange') // Adjust for your wall asset

    // 3) Add kitchen items
    const kitchenItems = [
      { key: 'refrigerator-stocked', x: 150, y: 450 },
      { key: 'sink-and-drawer', x: 300, y: 450 },
      { key: 'oven', x: 450, y: 450 },
      { key: 'table-with-cloth', x: 600, y: 500 },
      { key: 'blender', x: 200, y: 400 },
      { key: 'kettle', x: 320, y: 400 },
    ]

    kitchenItems.forEach((item) => {
      this.add.sprite(item.x, item.y, item.key).setScale(4)
    })

    // 4) Add a ground (invisible but collidable)
    const ground = this.add.rectangle(512, 720, 1024, 32, 0x00ff00, 0)
    this.physics.add.existing(ground, true)

    // 5) Create the player sprite and set up physics
    this.player = this.physics.add.sprite(100, 600, 'idle_0')
    this.player.setScale(4)
    this.player.setCollideWorldBounds(true)
    this.player.setBounce(0.1)

    // 6) Add collision between the player and ground
    this.physics.add.collider(this.player, ground)

    // 7) Set up cursor keys for player input
    this.cursors = this.input.keyboard!.createCursorKeys()

    // 8) Play the default idle animation
    this.player.play('idle')
  }

  update() {
    // Movement logic: left/right to walk, up to jump
    const onGround = this.player.body?.touching.down

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-150)
      this.player.setFlipX(true) // Face left
      this.player.play(onGround ? 'walk' : 'fall', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(150)
      this.player.setFlipX(false) // Face right
      this.player.play(onGround ? 'walk' : 'fall', true)
    } else {
      // No horizontal movement
      this.player.setVelocityX(0)
      this.player.play(onGround ? 'idle' : 'fall', true)
    }

    // Jumping logic
    if (this.cursors.up.isDown && onGround) {
      this.player.setVelocityY(-300)
      this.player.play('jump', true)
    }
  }
}
