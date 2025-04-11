import Phaser from 'phaser'
import GameStore from '../GameStore';
import { Howl } from 'howler';
import { preloadAssets } from '../preload';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu')
        this.fullText = `
사령관님, 당신의 도움이 필요합니다. 행성 케플러-186 f가 폭발한 후,
사방으로 소행성들이 날아다니며 저희에게 위험하게 다가오고 있습니다.
모두 파괴해 주십시오! 임무를 수행하시는 동안 저희 동맹군이 당신을
지원할 것입니다. 자원을 획득하기 위해 현재미션에 알맞는 전치사를
찾으시면 돼요!
휴식이 필요하시면, 우주 정거장에서 쉬시고요.
거기서 사령관님의 함선을 개선하실 수도 있습니다.
그럼 행운을 빕니다, 사령관님!
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
        this.soundPlaying = false; // Flag to track if the sound is playing
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
        this.beepSound = new Howl({
            src: ['audio/beep.wav']
        })


        const startGameButton = this.add.text(100, 340, '전치사 사냥 시작', { fontSize: '20px', fill: '#12F1D3' })
            .setInteractive()
            .on('pointerdown', () => {
                this.beepSound.play()
                this.transmissionSound.stop()
                this.scene.start('Shooter');
            })
            .on('pointerover', () => {
                startGameButton.setStyle({ fill: '#ff0ff0' });
                this.consoleClickSound.play()
            })
            .on('pointerout', () => {
                startGameButton.setStyle({ fill: '#12F1D3' });
            });
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