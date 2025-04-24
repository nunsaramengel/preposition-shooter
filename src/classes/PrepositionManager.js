import Phaser from 'phaser';
import GameStore from '../game/GameStore';

export default class PrepositionManager {
    constructor(scene, prepositionGroup, prepositionSpeed, prepositionOvalColor, prepositionTextStyle, pickedRightPrepositionSound, pickedWrongPrepositionSound) {
        this.scene = scene;
        this.prepositionGroup = prepositionGroup;
        this.prepositionSpeed = prepositionSpeed;
        this.prepositionOvalColor = prepositionOvalColor;
        this.prepositionTextStyle = prepositionTextStyle;
        this.spawnTimer = null;
        this.spawnIntervalMin = 2000; // Aus deiner Shooter-Klasse
        this.spawnIntervalMax = 5000; // Aus deiner Shooter-Klasse
        this.pickedRightPrepositionSound = pickedRightPrepositionSound;
        this.pickedWrongPrepositionSound = pickedWrongPrepositionSound;
    }

    startSpawner() {
        this.spawnTimer = this.scene.time.addEvent({
            delay: Phaser.Math.Between(this.spawnIntervalMin, this.spawnIntervalMax),
            callback: this.spawn,
            callbackScope: this,
            loop: true
        });
    }

    stopSpawner() {
        if (this.spawnTimer) {
            this.spawnTimer.destroy();
            this.spawnTimer = null;
        }

    }

    spawn() {
        if (!this.scene.currentVerb) {
            return;
        }

        const possiblePrepositions = [this.scene.currentVerb.wrongPreposition, this.scene.currentVerb.rightPreposition];
        const randomPreposition = Phaser.Math.RND.pick(possiblePrepositions);
        const x = Phaser.Math.Between(50, 750);
        const y = -50;

        const oval = this.scene.add.graphics({
            fillStyle: {
                color: this.prepositionOvalColor
            }
        });
        oval.fillEllipse(0, 0, 85, 45);

        const text = this.scene.add.text(0, 0, randomPreposition, this.prepositionTextStyle).setOrigin(0.5);

        const container = this.scene.add.container(x, y, [oval, text]);
        this.prepositionGroup.add(container);
        this.scene.physics.world.enable(container);
        container.body.setVelocityY(this.prepositionSpeed);
    }

    handleCollision(ship, prepositionContainer) {
        const prepositionText = prepositionContainer.getAt(1).text;
        prepositionContainer.destroy();

        if (prepositionText === this.scene.currentVerb.rightPreposition) {
            this.pickedRightPrepositionSound.play();
            this.scene.setScore(200);
        } else if (prepositionText === this.scene.currentVerb.wrongPreposition) {
            this.pickedWrongPrepositionSound.play();
            this.scene.setScore(-500);
        }
        console.log("USED VERBS: ", GameStore.usedVerbs)

    }
}
