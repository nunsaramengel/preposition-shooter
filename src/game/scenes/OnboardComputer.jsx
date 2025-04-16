import Phaser from "phaser";
import { preloadAssets } from "../preload";

class OnboardComputer extends Phaser.Scene{
    constructor() {
        super({key: "OnboardComputer"})
    }

    preload() {
        preloadAssets(this)
    }

    create() {
        
    }

    update() {
        
    }
}

export default OnboardComputer;