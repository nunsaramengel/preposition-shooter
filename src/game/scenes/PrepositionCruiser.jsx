import Phaser from "phaser";
import { preloadAssets } from "../preload";
import GameStore from "../GameStore";
import Preposition from "../../classes/Preposition"

class PrepositionCruiser extends Phaser.Scene {
    constructor() {
        super({ key: "PrepositionCruiser" })
        this.MAX_SHIELD = 10; // Define the maximum shield value
        this.failureDrumSound = null; // To hold the Howl sound for sadness
        this.gameOverSound = null;
        this.shipExplosionSound = null;
        this.isGameOverSequence = false;
        this.isStarBaseHit = false;
        this.koreanPart = `적이시느냐 친구이시느냐 모르니 일단 수수깨기 하나 푸시오.\n빈 칸에 들어갈 것을 고르시오:\n`;
        this.germanPart = `Wir haben ___________ gewartet, dass du uns das sagst.\n`;
        this.koreanTranslationPart = `우리는 너가 그 얘기를 해줄 것을 기다리고 있었어.\n`;
        this.starbaseStopped = false;
        this.questionAsked = false;
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



        this.score = GameStore.score;
        this.shield = GameStore.shield;
        this.question;

        this.starBaseMessage = `
적이시느냐 친구이시느냐 모르니 일단 수수깨기 하나 푸시오.
빈 칸에 들어갈 것을 고르시오:
Wir haben ___________ gewartet, dass du uns das sagst.
우리는 너가 그 얘기를 해줄 것을 기다리고 있었어.
`

        this.reduceShield = () => {
            const newShieldValue = Math.max(0, this.shield - 1);
            GameStore.update({ shield: newShieldValue });
            this.shield = newShieldValue;
        };

        this.setScore = (amount) => {
            const newScore = Math.max(0, this.score + amount);
            GameStore.update({ score: newScore });
            this.score = newScore;
        };

        this.explosionSound = new Howl({ src: ['audio/explosion.mp3'], volume: 1.0, onload: () => console.log('Explosion sound loaded'), onloaderror: (id, error) => console.error('Error loading explosion sound:', error) });
        this.laserSound = new Howl({ src: ['audio/laser.mp3'], volume: 1.0, onload: () => console.log('Laser sound loaded'), onloaderror: (id, error) => console.error('Error loading laser sound:', error) });
        this.bgMusic = new Howl({ src: ['audio/horizon_of_the_unknown.mp3'], volume: 1.0, onload: () => { console.log('Howl sound loaded'); this.bgMusic.play(); }, onloaderror: (id, error) => console.error('Error loading howl sound:', error) });
        this.hitSound = new Howl({ src: ['audio/hit.wav'], volume: 1.0, onload: () => console.log("hit sound loaded"), onloaderror: (id, error) => console.error('Error loading howl sound:', error) });
        this.failureDrumSound = new Howl({ // Initialize the sad sound using Howler
            src: ['audio/failure_drum.mp3'],
            volume: 1,
            onload: () => console.log('Failure drum sound loaded'),
            onloaderror: (id, error) => console.error('Error loading failure drum sound:', error)
        });
        this.gameOverSound = new Howl({
            src: ['audio/8bit_synth_defeat.wav'],
            volume: 1,
            onload: () => console.log('Game Over 8bit synth defeat Sound loaded'),
            onloaderror: (id, error) => console.error('Error loading sound: ', error, " id: ", id)
        });
        this.shipExplosionSound = new Howl({
            src: ['audio/shipExplosion.wav'],
            volume: 1,
            onload: () => console.log('Ship explosion sound loaded'),
            onloaderror: (id, error) => console.error('Error loading ship explosion sound:', error)
        });

        this.NUMBER_OF_STARS = 1000;
        this.SHIP_VELOCITY = 600;
        this.LASER_SCALE = 0.15;
        this.SHIP_SCALE = 0.19;
        this.laserSpeed = 1100;
        this.shipVelocityX = 0;
        this.stars = [];
        this.ship = this.physics.add.image(400, 550, 'ship').setOrigin(0.5, 0.5).setCollideWorldBounds(true).setScale(this.SHIP_SCALE).setDepth(1);
        this.lasers = this.physics.add.group({ defaultKey: 'laser', maxSize: 10 });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', this.shootLasers, this);
        this.anims.create({ key: 'explode', frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }), frameRate: 20, repeat: false });
        this.anims.create({ key: 'shipExplode', frames: this.anims.generateFrameNumbers('shipExplosion', { start: 0, end: 20 }), frameRate: 25, repeat: false });

        for (let i = 0; i < this.NUMBER_OF_STARS; i++) {
            const star = this.createStar();
            this.stars.push(star);
        }

        this.starbase = this.physics.add.image(400, -this.textures.get('starbase').getSourceImage().height * 0.26 +100, 'starbase').setScale(0.26).setRotation(Math.PI);

        this.physics.add.overlap(this.lasers, this.starbase, this.hitStarbase, null, this);

        this.counterLaser = this.physics.add.group({ defaultKey: 'starbaseLaser', maxSize: 1 })

        this.physics.add.overlap(this.counterLaser, this.ship, this.hitShip, null, this);
    }

    update() {
        this.ship.setVelocityX(this.shipVelocityX);
        if (!this.isStarBaseHit) {
            if (this.cursors.left.isDown) {
                this.ship.setVelocityX(this.SHIP_VELOCITY * -1);
            } else if (this.cursors.right.isDown) {
                this.ship.setVelocityX(this.SHIP_VELOCITY);
            } else {
                this.ship.setVelocityX(this.shipVelocityX);
            }
        } else return

        this.lasers.children.iterate((laser) => {
            if (laser && laser.y < 0) {
                laser.destroy();
            }
        });

        this.stars.forEach((star) => {
            star.y += star.speed;
            if (star.y > 600) {
                star.y = 0;
                star.x = Phaser.Math.Between(0, 800);
                star.speed = Phaser.Math.Between(1, 14);
            }
            star.graphics.setPosition(star.x, star.y);
        });

        if (this.shield <= 0 && !this.isGameOverSequence) {
            this.startGameOverSequence();
        }
        if (this.score <= 0 && !this.isGameOverSequence) {
            this.startGameOverSequence();
        }




        //First the starbas e flies 140, then let it slow down and stop in front of the space ship
        if (this.starbase.y < 240 ) {
            this.starbase.setVelocityY(140)
        } else if (this.starbase.y < 260 && !this.starbaseStopped) {
            this.starbase.setVelocityY(60)
        } else if (this.starbase.y < 270 && !this.starbaseStopped) {
            this.starbase.setVelocityY(40)
        } else if (this.starbase.y < 280 && !this.starbaseStopped) {
            this.starbase.setVelocityY(0)
            if (!this.starbaseStopped && !this.questionAsked) {
                this.starbaseStopped = true;
                this.questionAsked = true;
                this.time.delayedCall(800, () => {

                    const koreanFont = '20px yoon-px-pixman';
                    const germanFont = '20px pixelify-sans';
                    const yPos = 30;
                    const textColor = '#12F1D3';
                    const hoverColor = '#ff0ff0'; // Define the hover color
                    const strokeColor = '#000000';
                    const strokeThickness = 4;

                    const koreanText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 8 + yPos + 60, this.koreanPart, { font: koreanFont, fill: "#ffffff", stroke: strokeColor, strokeThickness: strokeThickness }).setOrigin(0.5, 1).setDepth(2).setAlpha(0); // Initial alpha 0
                    const germanText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + yPos + 60, this.germanPart, { font: germanFont, fill: "#ffffff", stroke: strokeColor, strokeThickness: strokeThickness }).setOrigin(0.5, 0.5).setDepth(2).setAlpha(0); // Initial alpha 0
                    const koreanTranslationText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 8 + yPos + 60, this.koreanTranslationPart, { font: koreanFont, fill: "#ffffff", stroke: strokeColor, strokeThickness: strokeThickness }).setOrigin(0.5, 0).setDepth(2).setAlpha(0); // Initial alpha 0

                    // Erstelle das halbtransparente Rechteck
                    const rectWidth = Math.max(koreanText.width, germanText.width, koreanTranslationText.width) + 20;
                    const rectHeight = koreanText.height + germanText.height + koreanTranslationText.height + 20;
                    const rectX = this.cameras.main.width / 2;
                    const rectY = this.cameras.main.height / 2 + yPos + 60 - rectHeight / 2;

                    const backgroundRect = this.add.rectangle(rectX, rectY + yPos + 25, rectWidth, rectHeight, 0x000000, 0.7).setOrigin(0.5).setDepth(1).setAlpha(0); // Initial alpha 0

                    // Position for the buttons
                    const buttonY = rectY + rectHeight / 2 + 70; // Adjust spacing as needed

                    // Button to fade out
                    const fadeOutButton = this.add.text(this.cameras.main.width / 2 - 100, buttonY, 'darüber', { font: koreanFont, fill: textColor, stroke: strokeColor, strokeThickness: strokeThickness })
                        .setOrigin(0.5)
                        .setInteractive()
                        .setDepth(2)
                        .setAlpha(0) // Initial alpha 0
                        .on('pointerdown', () => {
                            this.questionAsked = false;
                            // Fade out the rectangle, texts, and button
                            this.tweens.add({
                                targets: [backgroundRect, koreanText, germanText, koreanTranslationText, fadeOutButton, changeSceneButton],
                                alpha: 0,
                                duration: 1000, // Adjust duration as needed
                                onComplete: () => {
                                backgroundRect.destroy();
                                koreanText.destroy();
                                germanText.destroy();
                                koreanTranslationText.destroy();
                                fadeOutButton.destroy();
                                changeSceneButton.destroy();
                                }
                            });
                                this.starbase.setVelocityY(80)
                        })
                        .on('pointerover', () => {
                            fadeOutButton.setStyle({ fill: '#ff0ff0' });
                        })
                        .on('pointerout', () => {
                            fadeOutButton.setStyle({ fill: '#12F1D3' });
                        });

                    // Button to change scene
                    const changeSceneButton = this.add.text(this.cameras.main.width / 2 + 100, buttonY, 'darauf', { font: koreanFont, fill: textColor, stroke: strokeColor, strokeThickness: strokeThickness })
                        .setOrigin(0.5)
                        .setInteractive()
                        .setDepth(2)
                        .setAlpha(0) // Initial alpha 0
                        .on('pointerdown', () => {
                            // Change to another scene (replace 'AnotherSceneKey' with your actual scene key)
                            this.scene.start('StarBase');
                        })
                        .on('pointerover', () => {
                            changeSceneButton.setStyle({ fill: '#ff0ff0' });
                        })
                        .on('pointerout', () => {
                            changeSceneButton.setStyle({ fill: '#12F1D3' });
                        });

                    // Create a tween to fade in the elements
                    this.tweens.add({
                        targets: [backgroundRect, koreanText, germanText, koreanTranslationText, fadeOutButton, changeSceneButton],
                        alpha: 1,
                        duration: 1000, // Adjust duration as needed
                        ease: 'Linear' // Optional: You can add an easing function
                    });

                }, [], this)
            }
        }
    }

     startGameOverSequence() {
        this.isGameOverSequence = true;
        this.lasers.clear(true, true);
        this.bgMusic.stop();
        this.ship.setVelocityX(0);

        this.time.delayedCall(300, () => { // Verzögere um 500 Millisekunden (0.5 Sekunden)
            // Spiele die Schiffsexplosionsanimation
            const explosion = this.physics.add.sprite(this.ship.x, this.ship.y, 'shipExplosion').setScale(this.SHIP_SCALE * 20); // Adjust scale as needed
            explosion.play('shipExplode');
            this.shipExplosionSound.play();

            this.ship.setVisible(false); // Hide the ship immediately
            const explosionDuration = this.anims.get('shipExplode').duration;
            const soundDuration = this.shipExplosionSound.duration() * 1000; // Convert to milliseconds
            const delay = Math.max(explosionDuration, soundDuration);

            this.time.delayedCall(delay, () => {
                this.gameOverSound.play();
                this.scene.start('GameOver');
            }, [], this);
        }, [], this);
    }

     createStar() {
        const x = Phaser.Math.Between(0, 800);
        const y = Phaser.Math.Between(0, 600);
        const size = Phaser.Math.Between(0.4, 1.3);
        const speed = Phaser.Math.Between(1, 6);
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(x, y, size);
        return { x, y, size, speed, graphics };
    }

    shootLasers() {
        if (this.lasers.getLength() < this.lasers.maxSize) {
            const shipWidth = this.ship.width * this.ship.scaleX;
            const leftLaser = this.lasers.get();
            if (leftLaser) {
                leftLaser.setActive(true);
                leftLaser.setVisible(true);
                leftLaser.setPosition(this.ship.x - shipWidth / 2 + 35, this.ship.y + 10);
                leftLaser.setScale(this.LASER_SCALE);
                leftLaser.setVelocityY(-this.laserSpeed);
                this.laserSound.play();
            }
            const rightLaser = this.lasers.get();
            if (rightLaser) {
                rightLaser.setActive(true);
                rightLaser.setVisible(true);
                rightLaser.setPosition(this.ship.x + shipWidth / 2 - 35, this.ship.y + 10);
                rightLaser.setScale(this.LASER_SCALE);
                rightLaser.setVelocityY(-this.laserSpeed);
                this.laserSound.play();
            }
        }
    }


    hitShip(ship, object) {
        if (!this.isGameOverSequence) {
            this.flickerShip();
            this.hitSound.play();
            this.setScore(this.score)
            this.time.delayedCall(300, () => {
                if (this.shield <= 0) {
                    this.reduceShield();
                    object.destroy();
                    this.startGameOverSequence();
                }
            }, [], this)
        }
    }

    flickerShip() {
        if (this.isFlickering || this.isGameOverSequence) return;
        this.isFlickering = true;
        const originalAlpha = this.ship.alpha;
        let flickerCount = 0;
        const flickerInterval = setInterval(() => {
            this.ship.alpha = this.ship.alpha === 1 ? 0 : 1;
            flickerCount++;
            if (flickerCount >= 10) {
                clearInterval(flickerInterval);
                this.ship.alpha = originalAlpha;
                this.isFlickering = false;
            }
        }, 150);
        return () => clearInterval(flickerInterval);
    };

    gameOver() {
        // This method is now only called via the delayed call in startGameOverSequence
        this.gameOverSound.play();
        this.scene.start('GameOver');
    }

    hitStarbase(starbase, laser) {
        this.isStarBaseHit = true;
        this.time.delayedCall(5000, () => {
            this.isStarBaseHit = false;
        }, [], this)
        const starbaseCenterX = this.starbase.x;
        const starbaseCenterY = this.starbase.y;
        const laserX = laser.x;
        const laserY = laser.y;
        const distance = Phaser.Math.Distance.Between(laserX, laserY, starbaseCenterX, starbaseCenterY)
        const starbaseHeight = this.starbase.height;
        const radius = starbaseHeight / 2;
        const collisionThreshold = radius / 3;
        if (distance < (collisionThreshold / 2)) {
            laser.destroy()
        } else return

        const counterLaser = this.counterLaser.get();
        if (counterLaser) {
            counterLaser.setActive(true).setVisible(true);
            counterLaser.setPosition(starbaseCenterX, starbaseCenterY);
            counterLaser.setScale(0.7)
            this.physics.moveToObject(counterLaser, this.ship, 2000)
        }

        this.setScore(this.score * -1)
        while (this.shield > 0) {
            this.reduceShield();
        }

        this.startGameOverSequence()
        // Hier kannst du weitere Aktionen hinzufügen, die beim Treffen der Starbase passieren sollen,
        // z.B. visuelles Feedback, Soundeffekte, oder das Auslösen des Starbase-Gegenangriffs.

        // Wenn die Starbase zurückschießen soll, nachdem sie getroffen wurde,
        // könntest du hier eine Funktion aufrufen, die das Starbase-Schießen startet.

        /*if (!this.starbaseCanShoot) {
            this.starbaseCanShoot = true;
            this.startStarbaseShooting(); // Diese Funktion müsstest du noch implementieren
        }
        */
    }
}

export default PrepositionCruiser