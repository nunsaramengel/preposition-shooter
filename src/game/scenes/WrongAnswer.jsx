import Phaser from "phaser";
import { preloadAssets } from "../preload";

class WrongAnswer extends Phaser.Scene{
    constructor() {
        super({ key: "WrongAnswer" })
        this.fullText = `
유감스럽게도 대답이 틀리셨습니다, 사령관님.
적으로 오해받아 우주 기지가 그냥 지나쳤습니다.
다음 번에는 올바른 대답을 해주시고, 휴식도
가지시고 함선 업그레이드도 받으시기 바랍니다.
필승! 이상입니다! 
`;
        this.currentText = "";
        this.textDisplay;
        this.typewriterTimer;
        this.charIndex = 0;
        this.typingSpeed = 30;
        this.transmissionSound = new Howl({
            src: ['audio/transmission7.mp3'],
            loop: false // Set loop to true initially
        });
        this.soundPlaying = false; 
    }

    preload() {
        preloadAssets(this)
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

        this.textDisplay = this.add.text(100, 100, this.currentText, { fontSize: "20px", fill: '#fff' });

         this.consoleClickSound = new Howl({
            src: ['audio/console_click.wav'],
            volume: 1,
            onload: () => console.log('Console click sound loaded'),
            onloaderror: (id, error) => console.error('Error loading ship explosion sound: ', error, " ## id: ", id)
        })

        // Start the sound when the typewriter effect begins
        this.transmissionSound.play();
        this.soundPlaying = true;

        this.typewriterTimer = this.time.addEvent({
            delay: this.typingSpeed,
            callback: this.typeNextChar,
            callbackScope: this,
            loop: true
        })
        
    }

    update() {
        if (this.charIndex >= this.fullText.length && this.typewriterTimer) {
            this.typewriterTimer.destroy();
            this.typewriterTimer = null; // Clear the timer reference
            // Stop the sound when the typewriter effect is done
            if (this.soundPlaying) {
                this.transmissionSound.stop();
                this.soundPlaying = false;
            }
                this.time.delayedCall(600, () => { 
                this.scene.start("Level2")
            }, [], this)
        }
        
    }
    typeNextChar() {
        if (this.charIndex < this.fullText.length) {
            this.currentText += this.fullText[this.charIndex];
            this.textDisplay.setText(this.currentText);
            this.charIndex++;
        }
    }
}

export default WrongAnswer;

