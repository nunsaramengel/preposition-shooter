import Phaser from 'phaser';

class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.text(centerX, centerY - 100, 'GAME OVER', { fontSize: '50px', fill: '#fff' }).setOrigin(0.5);

        // Erstelle den Button als Text-Objekt
        const restartButton = this.add.text(centerX, centerY + 50, '재시작', { fontSize: '32px', fill: '#fff', backgroundColor: '#444', padding: { x: 20, y: 10 } })
            .setOrigin(0.5)
            .setInteractive() // Macht das Text-Objekt klickbar
            .on('pointerdown', () => {
                // Diese Funktion wird aufgerufen, wenn der Button geklickt wird
                window.location.reload(); // Lädt die Seite neu
            })
            .on('pointerover', () => {
                restartButton.setStyle({ fill: '#ff0', backgroundColor: '#666' }); // Ändere das Aussehen beim Überfahren
            })
            .on('pointerout', () => {
                restartButton.setStyle({ fill: '#fff', backgroundColor: '#444' }); // Setze das Aussehen zurück
            });
    }
}

export default GameOver;