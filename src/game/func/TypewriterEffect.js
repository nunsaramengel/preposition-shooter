import {Howl} from "howler";

class TypewriterEffect {
    constructor(scene, fullText, config = {}) {
        this.scene = scene;
        this.x = config.x || 100;
        this.y = config.y || 100;
        this.fullText = fullText;
        this.currentText = "";
        this.textDisplay = scene.add.text(this.x, this.y, this.currentText, config.textStyle || {
            fontSize: "20px",
            fill: '#fff'
        });
        this.typingSpeed = config.typingSpeed || 30;
        this.charIndex = 0;
        this.typewriterTimer = null;
        this.onCompleteCallback = config.onComplete;
        this.transmissionSound = new Howl({src: ['audio/transmission7.mp3'], loop: false});
        this.soundPlaying = false;
        this.startTime = 0; // Add a variable to store the start time
    }

    start() {
        this.reset();
        this.startTime = this.scene.time.now; // Record the start time
        if (this.transmissionSound) {
            this.transmissionSound.play();
            this.soundPlaying = true;
        }
        this.typewriterTimer = this.scene.time.addEvent({delay: this.typingSpeed, callback: this.typeNextChar, callbackScope: this, loop: true})
    }

    typeNextChar() {
        if (this.charIndex < this.fullText.length) {
            this.currentText += this.fullText[this.charIndex];
            this.textDisplay.setText(this.currentText);
            this.charIndex ++;
        } else {
            this.stop();
            const endTime = this.scene.time.now; // Record the end time
            const duration = endTime - this.startTime; // Calculate the duration
            console.log(`Typewriter finished in ${duration} milliseconds.`); // Log the duration
            if (this.onCompleteCallback) {
                this.onCompleteCallback.call(this.scene); // Rufe den Callback im Kontext der Szene auf
            }
        }
    }

    stop() {
        if (this.typewriterTimer) {
            this.typewriterTimer.destroy();
            this.typewriterTimer = null;
        }
        if (this.transmissionSound && this.soundPlaying) {
            this.transmissionSound.stop();
            this.soundPlaying = false;
        }
    }

    reset() {
        this.currentText = "";
        this.textDisplay.setText(this.currentText);
        this.charIndex = 0;
        this.startTime = 0; // Reset the start time
        if (this.typewriterTimer) {
            this.typewriterTimer.destroy();
            this.typewriterTimer = null;
        }
        if (this.transmissionSound && this.soundPlaying) {
            this.transmissionSound.stop();
            this.soundPlaying = false;
        }
    }

    setText(newText) {
        this.fullText = newText;
        this.reset();
    }

    destroy() {
        this.stop();
        this.textDisplay.destroy();
        if (this.transmissionSound) {
            this.transmissionSound.unload(); // Ressourcen freigeben
        }
    }

}

export default TypewriterEffect;
