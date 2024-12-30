import { Scene } from 'phaser'

export class Preloader extends Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    // Display a background and loading bar
    this.add.image(512, 384, 'background')
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff)

    this.load.on('progress', (progress: number) => {
      bar.width = 4 + 460 * progress
    })
  }

  preload() {
    // ─────────────────────────────────────────────────────────────────────
    // 1. HOUSE SPRITES (same as before — no change needed)
    // ─────────────────────────────────────────────────────────────────────
    this.load.setPath('assets/mp_house_interiors_tileset_pack/kitchen')

    const kitchenSprites = [
      'blender',
      'coffee-mug',
      'dish-rack-empty',
      'dish-rack-full',
      'dishwasher-closed',
      'dishwasher-open',
      'drawer-closed',
      'drawer-open',
      'garbage-closed',
      'garbage-open-empty',
      'garbage-open-full',
      'glass-thingy',
      'green-jar',
      'grey-plate',
      'kettle',
      'loaf-of-bread',
      'martini-glass',
      'microwave-closed',
      'microwave-open',
      'orange-plate',
      'oven',
      'pepper',
      'refrigerator-closed',
      'refrigerator-empty',
      'refrigerator-stocked',
      'salt-and-pepper',
      'salt',
      'shelf-with-pots',
      'sink-and-drawer',
      'skillet',
      'spatula-slotted',
      'spatula',
      'spoon',
      'stool',
      'stove-hood',
      'table-with-cloth',
      'table',
      'toaster-empty',
      'toaster-toasted',
      'toaster-toasting',
      'water-glass',
      'wide-drawer-closed',
      'wide-drawer-open',
      'wide-table-with-cloth',
      'wide-table',
    ]

    kitchenSprites.forEach((sprite) => {
      this.load.image(sprite, `${sprite}.png`)
    })

    // ─────────────────────────────────────────────────────────────────────
    // 2. WALLS AND BACKGROUNDS
    // ─────────────────────────────────────────────────────────────────────
    this.load.setPath('assets/mp_house_interiors_tileset_pack/walls_background')

    const wallAndBackgroundSprites = [
      'aliens',
      'balcony-blue',
      'balcony-orange',
      'brick-wall-grey',
      'brick-wall',
      'ceiling-fan',
      'ceiling-lamp',
      'chevron-green',
      'chevron-orange-to-red',
      'clouds',
      'crowns-yellow',
      'dark-grid',
      'door-closed-metal',
      'door-closed-wood',
      'door-frame-metal',
      'door-frame-wood',
      'door-half-open-metal',
      'door-half-open-wood',
      'door-to-shadow-metal',
      'door-to-shadow-wood',
      'door-to-steps-metal',
      'door-to-steps-wood',
      'flower-box-pink',
      'fluorescent-light',
      'hearts-pink',
      'interlocking-grey',
      'leaves-mint',
      'light-switch',
      'night-sky',
      'pyramids-lavender',
      'solid-blue',
      'solid-green',
      'solid-grey',
      'solid-orange',
      'solid-purple',
      'solid-red',
      'stripes-blue',
      'stripes-green',
      'stripes-grey',
      'stripes-orange',
      'stripes-purple',
      'stripes-red',
      'tile-wall-orange',
      'tiles-blue',
      'tiles-green',
      'tiles-grey',
      'tiles-orange',
      'tiles-purple',
      'tiles-red',
      'trim-metal',
      'trim-wood',
      'waves-blue',
      'wood-panel',
    ]

    wallAndBackgroundSprites.forEach((sprite) => {
      this.load.image(sprite, `${sprite}.png`)
    })

    // ─────────────────────────────────────────────────────────────────────
    // 3. CHARACTER FRAMES (already loaded individually)
    //    The loops below create separate texture keys like "climb_0", "climb_1", etc.
    // ─────────────────────────────────────────────────────────────────────

    // Character 1 sprite sheets
    this.load.setPath('assets/mp_character_animation_asset_pack/Female/Character_1/Clothes_1')

    const loadFrames = (prefix: string, range: number) => {
      for (let i = 0; i <= range; i++) {
        const suffix = range > 9 ? String(i).padStart(2, '0') : i
        this.load.image(`${prefix}_${suffix}`, `${prefix}_${suffix}.png`)
      }
    }

    loadFrames('Character1F_1_climb', 9)
    loadFrames('Character1F_1_damage', 1)
    loadFrames('Character1F_1_death', 7)
    loadFrames('Character1F_1_fall', 1)
    loadFrames('Character1F_1_idle', 7)
    loadFrames('Character1F_1_jump', 1)
    loadFrames('Character1F_1_land', 1)
    loadFrames('Character1F_1_pickup_ground', 7)
    loadFrames('Character1F_1_pickup_wall', 9)
    loadFrames('Character1F_1_punch', 5)
    loadFrames('Character1F_1_run', 7)
    loadFrames('Character1F_1_talk', 6)
    loadFrames('Character1F_1_use', 12)
    loadFrames('Character1F_1_wait', 5)
    loadFrames('Character1F_1_walk', 7)
  }

  create() {
    // Start the main menu scene once everything is loaded
    this.scene.start('MainMenu')

    // ─────────────────────────────────────────────────────────────────────
    // CREATE "STILL-FRAME" ANIMATIONS FROM INDIVIDUAL TEXTURE KEYS
    // ─────────────────────────────────────────────────────────────────────

    // Helper function to build an array of frames for a given prefix & numeric range.
    const buildFrames = (prefix: string, start: number, end: number) => {
      const frames: Phaser.Types.Animations.AnimationFrame[] = []
      for (let i = start; i <= end; i++) {
        // If pad2Digits is true, convert e.g. i=5 to "05"
        const suffix = end > 9 ? String(i).padStart(2, '0') : String(i)
        frames.push({ key: `${prefix}_${suffix}` })
      }
      return frames
    }

    // Now define animations. Each one references the separate frames you loaded above.

    this.anims.create({
      key: 'climb',
      frames: buildFrames('Character1F_1_climb', 0, 9),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'damage',
      frames: buildFrames('Character1F_1_damage', 0, 1),
      frameRate: 5,
      repeat: 0,
    })

    this.anims.create({
      key: 'death',
      frames: buildFrames('Character1F_1_death', 0, 7),
      frameRate: 8,
      repeat: 0,
    })

    this.anims.create({
      key: 'fall',
      frames: buildFrames('Character1F_1_fall', 0, 1),
      frameRate: 5,
      repeat: -1,
    })

    this.anims.create({
      key: 'idle',
      frames: buildFrames('Character1F_1_idle', 0, 7),
      frameRate: 6,
      repeat: -1,
    })

    this.anims.create({
      key: 'jump',
      frames: buildFrames('Character1F_1_jump', 0, 1),
      frameRate: 10,
      repeat: 0,
    })

    this.anims.create({
      key: 'land',
      frames: buildFrames('Character1F_1_land', 0, 1),
      frameRate: 10,
      repeat: 0,
    })

    this.anims.create({
      key: 'pickup_ground',
      frames: buildFrames('Character1F_1_pickup_ground', 0, 7),
      frameRate: 10,
      repeat: 0,
    })

    this.anims.create({
      key: 'pickup_wall',
      frames: buildFrames('Character1F_1_pickup_wall', 0, 9),
      frameRate: 10,
      repeat: 0,
    })

    this.anims.create({
      key: 'punch',
      frames: buildFrames('Character1F_1_punch', 0, 5),
      frameRate: 15,
      repeat: 0,
    })

    this.anims.create({
      key: 'run',
      frames: buildFrames('Character1F_1_run', 0, 7),
      frameRate: 12,
      repeat: -1,
    })

    this.anims.create({
      key: 'talk',
      frames: buildFrames('Character1F_1_talk', 0, 6),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'use',
      frames: buildFrames('Character1F_1_use', 0, 12),
      frameRate: 8,
      repeat: 0,
    })

    this.anims.create({
      key: 'wait',
      frames: buildFrames('Character1F_1_wait', 0, 5),
      frameRate: 5,
      repeat: -1,
    })

    this.anims.create({
      key: 'walk',
      frames: buildFrames('Character1F_1_walk', 0, 7),
      frameRate: 8,
      repeat: -1,
    })
  }
}
