export function createStar() {
    const x = Phaser.Math.Between(0, 800);
    const y = Phaser.Math.Between(0, 600);
    const size = Phaser.Math.Between(0.2, 1); // Zufällige Größe für den Stern
    const speed = Phaser.Math.Between(1, 6);
    // Zufällige Geschwindigkeit für den Stern

    // Erstelle ein Grafikobjekt für den Stern
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1); // Weiße Farbe für den Stern
    graphics.fillCircle(x, y, size);
    // Zeichne den Stern

    // Rückgabe eines Objekts, das den Stern repräsentiert
    return {
        x,
        y,
        size,
        speed,
        graphics
    };
}
