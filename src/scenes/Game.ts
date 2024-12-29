import { Scene } from 'phaser'

export class Game extends Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private block!: Phaser.Physics.Arcade.Sprite

  // Keep track of the last direction so we know which "stand" or "jump" anim to use
  private lastDirection: 'left' | 'right' = 'right'

  constructor() {
    super('Game')
  }

  create() {
    // 1) Background
    this.cameras.main.setBackgroundColor(0x00ff00)
    this.add.image(512, 384, 'background').setAlpha(0.5)

    // 2) Setup World bounds
    this.physics.world.setBounds(0, 0, 1024, 768)

    // 3) Add a "floor" (invisible, static body)
    const ground = this.add.rectangle(512, 760, 1024, 16, 0x00ff00, 0)
    this.physics.add.existing(ground, true)

    // 4) Create the player at left side
    //    Use the sprite sheet ('player01') you loaded in Preloader, defaulting to frame 8 (stand-right).
    this.player = this.physics.add.sprite(100, 600, 'player01', 8)
    this.player.setCollideWorldBounds(true)
    this.player.setBounce(0.1)

    // 5) Create the block near the right side, up high
    this.block = this.physics.add.sprite(850, 550, 'block')
    this.block.setImmovable(true)
    if (this.block.body instanceof Phaser.Physics.Arcade.Body) {
      this.block.body.setAllowGravity(false)
    }

    // 6) Collisions
    this.physics.add.collider(this.player, ground)
    this.physics.add.collider(this.player, this.block, this.hitBlock, undefined, this)

    // 7) Cursors for user input
    this.cursors = this.input.keyboard!.createCursorKeys()

    // 8) Instruction text
    this.add
      .text(512, 50, 'Move → and jump ↑ to hit the block!', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(0.5)
  }

  update() {
    // A common approach:
    // 1) Check if player is on the ground.
    // 2) Move left or right if keys pressed.
    // 3) Play appropriate walk / jump / stand animations.
    // 4) Jump if Up is pressed and on the ground.

    const onGround = this.player.body?.touching.down

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-240)

      // If on the ground, walk anim. If in the air, jump anim.
      if (onGround) {
        this.player.anims.play('walk-left', true)
      } else {
        this.player.anims.play('stand-left', true)
      }

      this.lastDirection = 'left'
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(240)

      if (onGround) {
        this.player.anims.play('walk-right', true)
      } else {
        this.player.anims.play('stand-right', true)
      }

      this.lastDirection = 'right'
    } else {
      // No left/right input
      this.player.setVelocityX(0)

      // If we're on the ground, stand in the last direction. If we're in the air, do jump anim.
      if (onGround) {
        if (this.lastDirection === 'left') {
          this.player.anims.play('stand-left')
        } else {
          this.player.anims.play('stand-right')
        }
      } else {
        if (this.lastDirection === 'left') {
          this.player.anims.play('stand-left', true)
        } else {
          this.player.anims.play('stand-right', true)
        }
      }
    }

    // Jump
    if (this.cursors.up.isDown && onGround) {
      this.player.setVelocityY(-400)
    }
  }

  private hitBlock: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (obj1, obj2) => {
    const p = obj1 as Phaser.Physics.Arcade.Sprite
    const b = obj2 as Phaser.Physics.Arcade.Sprite

    if (p.body && (p.body.blocked.up || p.body.touching.up)) {
      // "Bump" the block
      this.tweens.add({
        targets: b,
        y: b.y - 10,
        duration: 50,
        yoyo: true,
      })

      b.setTint(0xff0000)
      this.levelComplete()
    }
  }

  private levelComplete() {
    // We’ll just go to GameOver for now,
    // but you could show a "Level Complete" text or something else
    this.time.delayedCall(1000, () => {
      this.scene.start('GameOver')
    })
  }
}
