import Phaser from "phaser";
import { preloadAssets } from "../preload";

class Test extends Phaser.Scene{
    constructor() {
        super({key: "Test"})
        this.rechteck;
    }

    preload() {
        preloadAssets(this)
    }

    create() {
        const startX = this.cameras.main.width / 2;
        const startY = -50;
        this.rechteck = this.add.rectangle(startX, startY, 120, 60, 0xff0000)

        this.physics.add.existing(this.rechteck);

        this.rechteck.body.setVelocityY(100)

        const labelText = "über"
        const style = { font: '30px Arial', fill: '#000', align: "center" };
        this.label = this.add.text(this.rechteck.x, this.rechteck.y, labelText, style)


        this.label.setOrigin(0.5)
    }

    update() {

        this.label.x = this.rechteck.x;
        this.label.y = this.rechteck.y;

        if (this.rechteck.y > this.cameras.main.height + this.rechteck.height / 2) {
            console.log("Recht ist aus dem Bildschirm gefallen.")
        }
    }
}

export default Test;