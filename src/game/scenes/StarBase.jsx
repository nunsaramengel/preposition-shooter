import Phaser from 'phaser'
import { preloadAssets } from '../preload'

class StarBase extends Phaser.Scene {
    constructor() {
        super({key: 'StarBase'})
    }

    preload() {
        preloadAssets(this)
    }

    create() {
       
         // Setze die Kamera initial auf Alpha 0 (unsichtbar)
        this.cameras.main.setAlpha(0);

        // Starte Fade In der neuen Szene
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,
            duration: 800, // Dauer des Fade In in ms
            ease: 'Linear' // Optional: Easing-Funktion
        });
        this.workshop = this.physics.add.image(0, 0, 'workshop').setOrigin(0, 0).setDepth(1).setScale(1)
    }
}

export default StarBase