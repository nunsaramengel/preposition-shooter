import Phaser from "phaser"

export default function preload() {
    this.load.image('ship', 'img/ship.png');
    this.load.image('laser', 'img/laser.png');
    this.load.image('asteroid', 'img/asteroid.png');
}
