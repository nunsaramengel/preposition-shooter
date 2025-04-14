class Alert {
    constructor(scene, item, x, y) {
        this.scene = scene;
        this.item = item
        this.x = x || this.scene.cameras.main.width / 2;
        this.y = y || this.scene.cameras.main.height / 2;

    }

    display = () => {
        const centerX = this.x
        const centerY = this.y
        const alertImage = this.scene.add.image(centerX, centerY, this.item).setOrigin(0.5).setDepth(1000);

        this.scene.time.delayedCall(2500, () => {
            alertImage.destroy();
        }, [], this);
    }


}

export default Alert;
