import Phaser from "phaser";
import { preloadAssets } from "../preload";
import { Howl } from "howler";

class ApproachingStarBaseMonitor extends Phaser.Scene{
    constructor() {
        super({ key: 'ApproachingStarBaseMonitor' })
        this.fullText = `
사령관님, 우주 기지가 다가 오고 있습니다.
맞는 비밀번호를 말씀하시면 도킹을 허가 받으실 수 있습니다.
틀리시먄 우리를 적으로 간주힐 테니 꼭 맞는 비밀번호를 말씀
하시기 바래요. 그리고 절대로, 절대로 우주 기지에 먼저
사격하지 마세요, 사령관님!
        `

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
        this.textDisplay = this.add.text(100, 100, this.currentText, { fontSize: "20px", fill: '#fff' });
        this.transmissionSound.play();
        this.soundPlaying = true;

        this.starbaseApproachingSound = new Howl({
            src: ['audio/starbase_approaching.mp3'],
            volume: 0.2
        })

        this.typewriterTimer = this.time.addEvent({
            delay: this.typingSpeed,
            callback: this.typeNextChar,
            callbackScope: this,
            loop: true
        })
        this.time.delayedCall(7000, () => {
            this.scene.start('PrepositionCruiser')
        }, [], this)
    }

  

    update() {
        this.starbaseApproachingSound.play()
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

export default ApproachingStarBaseMonitor