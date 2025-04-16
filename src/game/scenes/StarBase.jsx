import Phaser from 'phaser'
import { preloadAssets } from '../preload'
import { Howl } from 'howler'
import fadeIn from '../func/fadeIn'
import GameStore from "../GameStore";

class StarBase extends Phaser.Scene {
    constructor() {
        super({ key: 'StarBase' })

    }

    preload() {
        preloadAssets(this)
    }

    create() {

        fadeIn(this)
       
        this.workshopAmbienceSound = new Howl({ src: ['audio/workshop_ambience.mp3'], volume: 0.5 })
        this.workshopAmbienceSound.play()
         // Setze die Kamera initial auf Alpha 0 (unsichtbar)

        // Starte Fade In der neuen Szene

        this.workshop = this.physics.add.image(0, 0, 'workshop').setOrigin(0, 0).setDepth(1).setScale(1)
    }
}

export default StarBase