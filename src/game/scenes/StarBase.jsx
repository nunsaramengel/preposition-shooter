import Phaser from 'phaser'
import { preloadAssets } from '../preload'
import { Howl } from 'howler'
import fadeIn from '../func/fadeIn'

class StarBase extends Phaser.Scene {
    constructor() {
        super({key: 'StarBase'})
    }

    preload() {
        preloadAssets(this)
    }

    create() {

        fadeIn(this)
       
        this.workshopAmbienceSound = new Howl({ src: ['audio/workshop_ambience.mp3'], volume: 0.5 })
        this.workshopAmbienceSound.play()
         // Setze die Kamera initial auf Alpha 0 (unsichtbar)
        this.cameras.main.setAlpha(0);


    }
}

export default StarBase