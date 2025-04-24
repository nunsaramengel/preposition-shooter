import Phaser from 'phaser'
import { preloadAssets } from '../preload'
import { Howl } from 'howler'
import fadeIn from '../func/fadeIn'
import GameStore from '../GameStore'
import DialogueBox from '../../classes/DialogueBox'

class Workshop extends Phaser.Scene {
    constructor() {
        super({ key: 'Workshop' })
        this.workshopEngineerSaying = null; // Initialisiere die Variable hier
    }

    preload() {
        preloadAssets(this)
        this.ringMenuOpenCloseSound = new Howl({ src: ["audio/ringMenuOpenClose.wav"] })
        this.workshopAmbienceSound = new Howl({ src: ['audio/workshop_ambience.mp3'], volume: 0.8, loop: true })
    }

    create() {
        fadeIn(this)
        this.workshop = this.physics.add.image(0, 0, 'workshop').setOrigin(0, 0).setDepth(0).setScale(1)
        this.workshopAmbienceSound.play()
        this.input.keyboard.on('keydown-Z', this.openRingMenu, this)
         // Füge den Keydown-Listener für die Taste "Q" hinzu
        this.input.keyboard.on('keydown-Q', this.goToLevel2, this);

        // Erstelle den Text und speichere ihn in this.workshopEngineerSaying
        this.workshopEngineerSaying = this.add.text(10, 10, `
Z 메뉴 열기 
ESC 메뉴 닫기
ENTER 구매하기
Q 우주로 돌아가기
            `,
            { fontSize: "18px", fontfamily: "yoon-px-pixman, sans-serif", stroke: "black", strokeThickness: 2 }
        ).setDepth(500).setAlpha(0); // Setze den Text zunächst auf unsichtbar


        this.dialogueBox = new DialogueBox(
            this,
            220,
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
                this.dialogueBox.startTypewriter("함선 작업실 Raumschiffwerkstatt에 오신 것을 환영합니다.\n 메뉴 열어서 가능한 업그레이드 선택하시오.", () => {

                // Nach dem der Text fertig ist, aktiviere den Enter-Listener

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


        // Setze einen Timer für die Anzeige des Textes
        console.log("THE CURRENT LEVEL IS:", GameStore.level)
    }




    update() {
        // Überprüfe den Status von GameStore.isRingMenuOpen
        if (GameStore.isRingMenuOpen) {
            if (this.workshopEngineerSaying) {
                this.workshopEngineerSaying.setAlpha(0); // Verstecke den Text
            }
        } else {
            if (!GameStore.isRingMenuOpen) {
                this.workshopEngineerSaying.setAlpha(1); // Zeige den Text an
            }
        }
    }

    openRingMenu() {
        this.scene.pause('Workshop');
        this.sound.play('whip')
        this.scene.launch('RingMenu', {
            items: GameStore.menuItems,
            callback: this.handleMenuSelection,
            parentSceneKey: 'Tutorial'
        });
        GameStore.update({ isRingMenuOpen: true })
        console.log("openRingMenu... isRingMenuOpen: ", GameStore.isRingMenuOpen)
    }

    handleMenuSelection(selectedItem) {
        switch (selectedItem.label) {
            case '플라스마빔':
                GameStore.update({sceneConfig: {...GameStore.sceneConfig, plasmaBeam: true}})
                break;
            case '파워업플러스':
                GameStore.update({
                    resourceMap: {
                        ...GameStore.resourceMap,
                        "gold": { ...GameStore.resourceMap["gold"], amount: 18 },
                        "lithium": { ...GameStore.resourceMap["lithium"], amount: 14 },
                        "plasma": { ...GameStore.resourceMap["plasma"], amount: 8 },
                        "titanium": { ...GameStore.resourceMap["titanium"], amount: 16 },
                        "iron": { ...GameStore.resourceMap["iron"], amount: 12 },
                        "shield": { ...GameStore.resourceMap["shield"], amount: 8 },
                    },
                },)
                break;
            case '플라스마쉴드':
                console.log("플라스마쉴드 ausgewählt. AHA!")
                GameStore.update({
                    sceneConfig: { ...GameStore.sceneConfig, plasmaShield: true, shieldMaximum: 15 },
                    shield: 15
                });
                break;
            case '터보엔진':
                GameStore.update({sceneConfig: {...GameStore.sceneConfig, shipVelocity: 1000}})
                break;
            case 'Y레이저빔':
                GameStore.update({sceneConfig: {...GameStore.sceneConfig, yLaser: true}})
                break;
        }
    }
       goToLevel2() {
        this.scene.start('Level2');
    }
}

export default Workshop
