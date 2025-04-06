import Phaser from 'phaser'

class GameOver extends Phaser.Scene {
    constructor() {
        super({key: 'GameOver'})
    }

    create() {
        this.add.text(100, 100, 'GAME OVER', {fontSize: "50px", fill: '#fff'})
    }
}

export default GameOver