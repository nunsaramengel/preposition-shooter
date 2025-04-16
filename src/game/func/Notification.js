import Phaser from "phaser";

class Notification {
    constructor(scene, text) {
        this.scene = scene;
        this.text = text;
        this.x = this.scene.cameras.main.width / 2;
        this.y = 480;
    }

    display = () => {
        const centerX = this.x
        const centerY = this.y
        const alertText = this.scene.add.text(centerX, centerY, this.text, {
            font: '30px yoon-px-pixman',
            fill: 'violet',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(1000);

        this.scene.time.delayedCall(2500, () => {
            alertText.destroy();
        }, [], this);
    }

}

export default Notification;
