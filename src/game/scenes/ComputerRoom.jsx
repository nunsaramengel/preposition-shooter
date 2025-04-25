import Phaser from "phaser";
import fadeIn from "../func/fadeIn";
import { preloadAssets } from "../preload";
import GameStore from "../GameStore";
import Preposition from "../../classes/Preposition";



class ComputerRoom extends Phaser.Scene{
    constructor() {
        super({ key: "ComputerRoom" })
        this.prep = new Preposition();
        this.verbs = GameStore.usedVerbs
    }

    preload() {
        preloadAssets(this)
    }

    create() {
        fadeIn(this);

        this.verbs.map((verb, index) => {
            const yOffset = 100
            const yPosition = (25 * (index + 1)) + yOffset;
            const verbText = `${verb.verb}`;
            const prepText = `+ ${verb.rightPreposition}`;
            const koText = `한국어: ${verb.ko}`;

            // Hier kannst du die Breite der Spalten anpassen
            const verbX = 50;
            const prepX = 210; // X-Position für die Präposition
            const koX = 350; // X-Position für die koreanische Übersetzung

            this.add.text(verbX, yPosition, verbText, { fill: 'turquoise', stroke: '#000000', strokeThickness: 2 }).setOrigin(0, 0);
            this.add.text(prepX, yPosition, prepText, { fill: 'turquoise', stroke: '#000000', strokeThickness: 2 }).setOrigin(0, 0);
            this.add.text(koX, yPosition, koText, { fill: 'violet', stroke: '#000000', strokeThickness: 2 }).setOrigin(0, 0);
        });
        this.sInput = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.sInput.on('down', this.goToStarBase, this);
        this.qInput = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.qInput.on('down', this.goBackToSpace, this);

        this.workshopEngineerSaying = this.add.text(2, 0, `
  S 프로메테우스 홀로 돌아가기  
  Q 우주로 돌아가기
            `,
            { fontSize: "18px", fontfamily: "yoon-px-pixman, sans-serif", stroke: "black", strokeThickness: 2 }
        ).setDepth(500)

    }

    update() {
        this.verbs = GameStore.usedVerbs
    }

    goToStarBase() {
        if (this.sInput) {
            this.sInput.off('down', this.goToStarBase, this); // Deaktiviere den Listener
            this.scene.start('StarBase');
        }
    }

    goBackToSpace() {
        if (this.qInput) {
            this.qInput.off("down", this.goBackToSpace, this)
            this.scene.start("Level2")
        }
    }

}

export default ComputerRoom;