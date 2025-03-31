export function shootLasers(lasers, ship) {
    const laserSpeed = 600;

    if (lasers.getLength() < lasers.maxSize) { // Breite des Schiffs ermitteln
        const shipWidth = ship.width * ship.scaleX;
        // Anpassung für Skalierung

        // Linken Laser erstellen
        const leftLaser = lasers.get();
        if (leftLaser) {
            leftLaser.setActive(true);
            leftLaser.setVisible(true);
            leftLaser.setPosition(ship.x - shipWidth / 2 + 35, ship.y + 10);
            leftLaser.setVelocityY(- laserSpeed);
        }

        // Rechten Laser erstellen
        const rightLaser = lasers.get();
        if (rightLaser) {
            rightLaser.setActive(true);
            rightLaser.setVisible(true);
            rightLaser.setPosition(ship.x + shipWidth / 2 - 35, ship.y + 10);
            rightLaser.setVelocityY(- laserSpeed);
        }
    }
}
