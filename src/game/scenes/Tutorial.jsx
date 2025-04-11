import Phaser from "phaser";
import { preloadAssets } from "../preload";

class Tutorial extends Phaser.Scene{
    constructor() { 
        super({key: "Tutorial"})
        
    }

    preload() {
        preloadAssets(this)
    }
}

export default Tutorial;