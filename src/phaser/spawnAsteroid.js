export function spawnAsteroid(asteroids) {
    const x = Phaser.Math.Between(0, 800);
    const asteroid = asteroids.create(x, 0, 'asteroid');

    // Skaliere den Asteroiden auf 2/3 seiner ursprünglichen Größe
    asteroid.setScale(0.67);

    // Setze eine zufällige vertikale Geschwindigkeit zwischen 50 und 150
    const randomSpeed = Phaser.Math.Between(50, 150);
    asteroid.setVelocityY(randomSpeed);

    // Setze eine zufällige Drehgeschwindigkeit für die Rotation
    const randomRotationSpeed = Phaser.Math.Between(-100, 100);
    asteroid.setAngularVelocity(randomRotationSpeed);
}
