import Phaser from 'phaser';
import GameStore from '../GameStore';

class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    create() {

        this.cameras.main.setAlpha(0);

        // Starte Fade In der neuen Szene
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,
            duration: 800, // Dauer des Fade In in ms
            ease: 'Linear' // Optional: Easing-Funktion
        });

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.text(centerX, centerY - 100, 'GAME OVER', { fontSize: '50px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(centerX, centerY - 50, GameStore.sceneConfig.gameOverReason, { fontSize: '20px', fill: 'turquoise' }).setOrigin(0.5);

        // Erstelle den Button als Text-Objekt
        const restartButton = this.add.text(centerX, centerY + 50, '재시작', { fontSize: '32px', fill: '#fff', backgroundColor: '#2E2C2C', padding: { x: 20, y: 10 } })
            .setOrigin(0.5)
            .setInteractive() // Macht das Text-Objekt klickbar
            .on('pointerdown', () => {
                // Diese Funktion wird aufgerufen, wenn der Button geklickt wird
                window.location.reload(); // Lädt die Seite neu
            })
            .on('pointerover', () => {
                restartButton.setStyle({ fill: 'violet', backgroundColor: '#666' }); // Ändere das Aussehen beim Überfahren
            })
            .on('pointerout', () => {
                restartButton.setStyle({ fill: '#fff', backgroundColor: '#444' }); // Setze das Aussehen zurück
            });
    }
}

export default GameOver;