import Phaser from "phaser";


export class Button extends Phaser.GameObjects.Sprite {
    onInputOver = () => {}
    onInputOut = () => {}
    onInputUp = () => {}

    constructor(scene, x, y, texture, actionOnClick = () => {}, overFrame, outFrame, downFrame) {
        super(scene, x, y, texture)
        scene.add.existing(this)

        this.setFrame(outFrame)
            .setInteractive()

            .on('pointerover', () => {
                this.onInputOver()
                this.setFrame(overFrame)
            })
            .on('pointerdown', () => {
                actionOnClick()
                this.setFrame(downFrame)
            })
            .on('pointerup', () => {
                this.onInputUp()
                this.setFrame(overFrame)
            })
            .on('pointerout', () => {
                this.onInputOut()
                this.setFrame(outFrame)
            })
    }
}