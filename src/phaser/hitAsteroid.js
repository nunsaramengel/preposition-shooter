export function hitAsteroid(laser, asteroid) { // Berechne den Abstand zwischen dem Laser und dem Mittelpunkt des Asteroiden
    const distance = Phaser.Math.Distance.Between(laser.x, laser.y, asteroid.x, asteroid.y);

    // Definiere die Größe des Asteroiden
    const radius = Math.min(asteroid.width, asteroid.height) / 2;

    // Definiere einen Schwellenwert für die Kollision (3/4 des Radius)
    const collisionThreshold = radius * 0.75;

    // Überprüfe, ob der Abstand kleiner als der Schwellenwert ist
    if (distance < collisionThreshold) {
        laser.destroy();
        asteroid.destroy();
    }
}
