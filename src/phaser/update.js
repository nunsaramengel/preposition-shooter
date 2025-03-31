export default function update() { // Move the starship
    if (this.cursors.left.isDown) {
        this.ship.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
        this.ship.setVelocityX(300);
    } else {
        this.ship.setVelocityX(0);
    }

    // Update laser positions and destroy if off-screen
    this.lasers.children.iterate((laser) => {
        if (laser && laser.y < 0) {
            laser.destroy();
        }
    });

    // Update star positions
    this.stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > 600) {
            star.y = 0;
            star.x = Phaser.Math.Between(0, 800);
            star.speed = Phaser.Math.Between(1, 6);
        }
        star.graphics.setPosition(star.x, star.y);
    });
}
