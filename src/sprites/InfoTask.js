import Phaser from "phaser";

export class InfoTask extends Phaser.GameObjects.Sprite {

    constructor(scene) {
        super(scene);
        this.scene.add.existing(this);
        this.opened = false;

    }

    hide() {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 150,
        });
    }

    show() {
        console.log('sdfsd')
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 150,
        });
    }

    showModal(){
        this.opened = true;
        this.show();
    }

    closeModal() {
        this.opened = true;
        this.hide();
    }
}