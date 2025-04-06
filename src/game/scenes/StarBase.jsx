import Phaser from 'phaser'

class StarBase extends Phaser.Scene {
    constructor() {
        super({key: 'StarBase'})
    }

    create() {
        this.add.text(100, 100, 'Star Base', {fontSize: "50px", fill: '#fff'})
    }
}

export default StarBase