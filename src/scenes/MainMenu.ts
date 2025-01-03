import { Scene } from 'phaser'

export class MainMenu extends Scene {
  constructor() {
    super('MainMenu')
  }

  create() {
    this.add.image(512, 384, 'background')

    this.add
      .text(512, 300, 'Sister Wars', {
        fontFamily: 'Departure Mono',
        fontSize: 60,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 10,
        align: 'center',
      })
      .setOrigin(0.5)

    this.add
      .text(512, 460, 'Main Menu', {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center',
      })
      .setOrigin(0.5)

    this.input.once('pointerdown', () => {
      this.scene.start('Game')
    })
  }
}
