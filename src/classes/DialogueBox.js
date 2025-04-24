import TypewriterEffect from '../game/func/TypewriterEffect';
import Phaser from 'phaser';

class DialogueBox extends Phaser.GameObjects.Container {
    constructor(scene, x, y, textureKey, left, top, right, bottom, textConfig) {
        super(scene, x, y);
        this.scene = scene;
        this.textureKey = textureKey;
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.paddingX = 20;
        this.paddingY = 16;
        this.fixedWidth = 400;
        this.minHeight = 200;
        this.defaultTextConfig = {
            fontFamily: 'monospace', // Standard-Font
            fontSize: '16px',
            color: '#ffffff',
            wordWrap: {
                width: this.fixedWidth - this.left - this.right - this.paddingX * 2, // An die feste Breite anpassen
                useAdvancedWrap: true
            }, // Feste Breite für Word Wrap
            ...textConfig // Überschreibe Standardwerte mit den übergebenen Werten
        };


        this.background = scene.add.nineslice(0, 0, textureKey, null, this.fixedWidth, this.minHeight, left, top, right, bottom).setOrigin(0.5);
        this.textDisplay = scene.add.text(0, 0, '', this.defaultTextConfig).setOrigin(0.5)
        this.typewriterEffect = null;
        this.currentText = '';
        this.onCompleteCallback = null;

        this.add(this.background);
        this.add(this.textDisplay);

        scene.add.existing(this); // Füge den Container zur Szene hinzu
    }

    resizeBackground() {
        const textWidth = this.textDisplay.width;
        const textHeight = this.textDisplay.height;

        const calculatedHeight = textHeight + this.top + this.bottom + this.paddingY * 2;
        this.background.width = this.fixedWidth;
        this.background.height = Math.max(this.minHeight, calculatedHeight);

        this.textDisplay.setPosition(0, 0);

        // Aktualisiere die interaktive Fläche, falls nötig
        this.setInteractive(new Phaser.Geom.Rectangle(-this.background.width / 2, -this.background.height / 2, this.background.width, this.background.height), Phaser.Geom.Rectangle.Contains);
    }

    startTypewriter(text, onCompleteCallback) {
        this.currentText = text;
        this.onCompleteCallback = onCompleteCallback;
        this.textDisplay.setText(''); // Leere den Text, bevor der Typewriter startet
        if (this.typewriterEffect) {
            this.typewriterEffect.destroy(); // Stelle sicher, dass ein vorheriger Effekt beendet wird
        }

        this.typewriterEffect = new TypewriterEffect(this.scene, text, {
            ...this.defaultTextConfig,
            x: -150, // Relativ zum Container
            y: -60, // Relativ zum Container
            textStyle: this.defaultTextConfig,
            onComplete: () => {
                this.resizeBackground();
                if (this.onCompleteCallback) {
                    this.onCompleteCallback.call(this.scene);
                }
                this.typewriterEffect = null; // Clear the reference
            }
        });

        this.add(this.typewriterEffect.textDisplay); // Füge den Text des Typewriter-Effekts zum Container hinzu
        this.typewriterEffect.start();
        this.textDisplay.visible = false; // Verstecke das ursprüngliche Textobjekt
        this.resizeBackground(); // Rufe resizeBackground auf, um die anfängliche Höhe anzupassen
    }

    setText(text) {
        if (this.typewriterEffect) {
            this.typewriterEffect.stop();
            this.typewriterEffect.destroy();
            this.typewriterEffect = null;
        }
        this.currentText = text;
        this.textDisplay.setText(text);
        this.textDisplay.visible = true;
        this.resizeBackground();
    }

    destroy(fromScene) {
        if (this.typewriterEffect) {
            this.typewriterEffect.destroy();
        }
        super.destroy(fromScene);
    }
}

export default DialogueBox;
