import Phaser from 'phaser'
import { preloadAssets } from '../preload'
import { Howl } from 'howler'

class StarBase extends Phaser.Scene {
    constructor() {
        super({key: 'StarBase'})
    }

    preload() {
        preloadAssets(this)
    }

    create() {
       
        this.workshopAmbienceSound = new Howl({ src: ['audio/workshop_ambience.mp3'] })
        this.workshopAmbienceSound.play()
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