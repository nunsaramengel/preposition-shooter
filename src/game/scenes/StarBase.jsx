import Phaser from 'phaser'
import { preloadAssets } from '../preload'
import { Howl } from 'howler'
import fadeIn from '../func/fadeIn'
import GameStore from "../GameStore";
import DialogueBox from '../../classes/DialogueBox';

class StarBase extends Phaser.Scene {
    constructor() {
        super({ key: 'StarBase' })
        this.enterInput = null;
        this.dialogueFinished = false;
    }

    preload() {
        preloadAssets(this)
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height - 400;


        this.workshopAmbienceSound = new Howl({ src: ['audio/workshop_ambience.mp3'], volume: 0.5 })
        this.workshopAmbienceSound.play()
        fadeIn(this)
         // Setze die Kamera initial auf Alpha 0 (unsichtbar)

        // Starte Fade In der neuen Szene

        this.starbase = this.physics.add.image(0, 0, 'starbase3Doors').setOrigin(0, 0).setDepth(0).setScale(0.5)
        this.madra = this.physics.add.image(-10, 250, "madra").setOrigin(0, 0).setDepth(2).setScale(0.5)
        this.workshopEngineerSaying = this.add.text(2, 0, `
  ENTER 함선 작업실에  
  P 동사 컴퓨터실
            `,
            { fontSize: "18px", fontfamily: "yoon-px-pixman, sans-serif", stroke: "black", strokeThickness: 4, backgroundColor: "lab(0 0 0 / 0.4)" }
        ).setDepth(500)

        this.dialogueBox = new DialogueBox(
            this,
            550,
            440,
            'dialogueBox',
            20, // left
            20, // top
            20, // right
            20, // bottom
            {
                fontFamily: 'monospace',
                fontSize: '20px',
                color: '#ffffff',
                wordWrap: { width: 300, useAdvancedWrap: true }
            }
        );

        this.time.delayedCall(600, () => {
            // Starte den Typewriter-Effekt
            this.dialogueBox.startTypewriter("우주 기지 <프로메테우스>에 오신 것을 환영합니다. 저는 마드라라고 해요. 함선 업그레이드는 작업실, 만나보신 동사는 동사 컴퓨터실에 들어가시면 됩니다.", () => {

                // Nach dem der Text fertig ist, aktiviere den Enter-Listener+
                this.dialogueFinished = true;
                this.enterInput = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
                this.enterInput.on('down', this.goToWorkshop, this);
                this.pInput = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
                this.pInput.on('down', this.goToComputerRoom, this);

                this.time.delayedCall(1000, () => {
                    
                    this.tweens.add({
                        targets: this.dialogueBox,
                        alpha: 0,
                        duration: 600,
                        ease: 'Linear',
                        onComplete: () => {
                            this.dialogueBox.destroy(this);
                        }
                    });

                    // Fade Out von Madra
      /*              this.tweens.add({
                        targets: this.madra,
                        alpha: 0,
                        duration: 600,
                        ease: 'Linear',
                        onComplete: () => {
                            this.madra.destroy();
                        }
                    }); */

                }, [], this);
                // Optional: Weitere Aktionen nach Abschluss des Tippens
            });
        }, [], this);



    // Du kannst den Text auch ohne Typewriter setzen:
    // this.time.delayedCall(5000, () => {
    //   this.dialogueBox.setText("Neuer Text ohne Tippeffekt.");
    // });

    }

    goToWorkshop() {
        if (this.dialogueFinished && this.enterInput) {
            this.enterInput.off('down', this.goToWorkshop, this); // Deaktiviere den Listener
            this.scene.start('Workshop');
        }
    }

    goToComputerRoom() {
        if (this.dialogueBox && this.pInput) {
            this.pInput.off("down", this.goToComputerRoom, this);
            this.scene.start("ComputerRoom")
        }
    }
}

export default StarBase