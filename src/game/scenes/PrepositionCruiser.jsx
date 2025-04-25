import Phaser from "phaser";
import { preloadAssets } from "../preload";
import GameStore from "../GameStore";
import fadeIn from "../func/fadeIn";
import Notification from "../func/Notification";
import WebFont from "webfontloader";

class PrepositionCruiser extends Phaser.Scene {
    constructor() {
        super({ key: "PrepositionCruiser" })
        this.MAX_SHIELD = 10;
        this.canShoot = true; // Flag, um zu steuern, ob geschossen werden darf
        this.shootDelay = 1; 
        this.failureDrumSound = null;
        this.gameOverSound = null;
        this.shipExplosionSound = null;
        this.isGameOverSequence = false;
        this.isStarBaseHit = false;
        this.koreanPart = `적이시느냐 친구이시느냐 모르니 일단 수수깨기 하나 푸시오.\n빈 칸에 들어갈 것을 고르시오:\n`;
        this.germanPart = `Wir haben ___________ gewartet, dass du uns das sagst.\n`;
        this.koreanTranslationPart = `우리는 너가 그 얘기를 해줄 것을 기다리고 있었어.\n`;
        this.starbaseStopped = false;
        this.questionAsked = false;
        this.isMovingToCenter = false; // Flagge, um die Bewegung zur Mitte zu verfolgen
    }

    preload() {
        preloadAssets(this)
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.once('load', () => {
            WebFont.load({
                typekit: {
                id: 'hrd1czj' // Deine Typekit ID
                },
                active: () => {
                console.log('Adobe Fonts geladen und aktiv.');
                // Hier kannst du Aktionen ausführen, die von den geladenen Schriftarten abhängen,
                // oder einfach fortfahren, da Phaser jetzt die Schriftarten verwenden kann.
                },
                inactive: () => {
                console.warn('Adobe Fonts konnten nicht geladen werden.');
                // Hier kannst du eine Fallback-Schriftart laden oder eine Fehlermeldung anzeigen.
                }
            });
        });

    }

    create() {
        fadeIn(this)
        this.nebularBG = this.add.tileSprite(400, 300, 800, 600, 'nebula')
        
        this.beepSound = new Howl({ src: ['audio/beep.wav'] })
        this.starbaseDoorOpenSound = new Howl({ src: ['audio/starbase_door_open.wav']})
        this.consoleClickSound = new Howl({ src: ['audio/console_click.wav'], volume: 1, onload: () => console.log('Console click sound loaded'), onloaderror: (id, error) => console.error('Error loading ship explosion sound: ', error, " ## id: ", id)})
        this.cameras.main.setAlpha(0);
        this.tweens.add({ targets: this.cameras.main, alpha: 1, duration: 800, ease: 'Linear' });

        this.score = GameStore.score;
        this.shield = GameStore.shield;
        this.question;
        this.starBaseMessage = `적이시느냐 친구이시느냐 모르니 일단 수수깨기 하나 푸시오.\n빈 칸에 들어갈 것을 고르시오:\nWir haben ___________ gewartet, dass du uns das sagst.\n우리는 너가 그 얘기를 해줄 것을 기다리고 있었어.\n`;
        this.reduceShield = () => { const newShieldValue = Math.max(0, this.shield - 1); GameStore.update({ shield: newShieldValue }); this.shield = newShieldValue; };
        this.setScore = (amount) => { const newScore = Math.max(0, this.score + amount); GameStore.update({ score: newScore }); this.score = newScore; };
        this.explosionSound = new Howl({ src: ['audio/explosion.mp3'], volume: 1.0, onload: () => console.log('Explosion sound loaded'), onloaderror: (id, error) => console.error('Error loading explosion sound:', error) });
        this.laserSound = new Howl({ src: ['audio/laser.mp3'], volume: 1.0, onload: () => console.log('Laser sound loaded'), onloaderror: (id, error) => console.error('Error loading laser sound:', error) });
        this.bgMusic = new Howl({ src: ['audio/horizon_of_the_unknown.mp3'], volume: 1.0, onload: () => { console.log('Howl sound loaded'); this.bgMusic.play(); }, onloaderror: (id, error) => console.error('Error loading howl sound:', error) });
        this.hitSound = new Howl({ src: ['audio/hit.wav'], volume: 1.0, onload: () => console.log("hit sound loaded"), onloaderror: (id, error) => console.error('Error loading howl sound:', error) });
        this.failureDrumSound = new Howl({ src: ['audio/failure_drum.mp3'], volume: 1, onload: () => console.log('Failure drum sound loaded'), onloaderror: (id, error) => console.error('Error loading failure drum sound:', error) });
        this.gameOverSound = new Howl({ src: ['audio/8bit_synth_defeat.wav'], volume: 1, onload: () => console.log('Game Over 8bit synth defeat Sound loaded'), onloaderror: (id, error) => console.error('Error loading sound: ', error, " id: ", id) });
        this.shipExplosionSound = new Howl({ src: ['audio/shipExplosion.wav'], volume: 1, onload: () => console.log('Ship explosion sound loaded'), onloaderror: (id, error) => console.error('Error loading ship explosion sound:', error) });

        this.NUMBER_OF_STARS = 1000;
        this.SHIP_VELOCITY = GameStore.sceneConfig.shipVelocity;
        this.LASER_SCALE = GameStore.sceneConfig.laserScale;
        this.SHIP_SCALE = GameStore.sceneConfig.shipScale;
        this.plasmaBeam = GameStore.sceneConfig.plasmaBeam
        this.laserSpeed = 1100;
        this.shipVelocityX = 0;
        this.stars = [];
        this.ship = this.physics.add.image(400, 550, 'shipP').setOrigin(0.5, 0.5).setCollideWorldBounds(true).setScale(this.SHIP_SCALE).setDepth(0); // Set ship's depth higher initially
        this.lasers = this.physics.add.group({ defaultKey: 'laser', maxSize: 6 });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', this.shootLasers, this);
        this.anims.create({ key: 'explode', frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }), frameRate: 20, repeat: false });
        this.anims.create({ key: 'shipExplode', frames: this.anims.generateFrameNumbers('shipExplosion', { start: 0, end: 20 }), frameRate: 25, repeat: false });
        for (let i = 0; i < this.NUMBER_OF_STARS; i++) { const star = this.createStar(); this.stars.push(star); }
        this.starbase = this.physics.add.image(400, -this.textures.get('starbase').getSourceImage().height * 0.26 + 100, 'starbase').setScale(0.26).setRotation(Math.PI).setDepth(1); // Set starbase's depth lower
        this.physics.add.overlap(this.lasers, this.starbase, this.hitStarbase, null, this);
        this.counterLaser = this.physics.add.group({ defaultKey: 'starbaseLaser', maxSize: 1 })
        this.physics.add.overlap(this.counterLaser, this.ship, this.hitShip, null, this);
    }

    update() {

        this.nebularBG.setScale(2)
        this.nebularBG.setAlpha(0.5)
        this.nebularBG.tilePositionY -= 0.01;

        this.stars.forEach((star) => { star.y += star.speed; if (star.y > 600) { star.y = 0; star.x = Phaser.Math.Between(0, 800); star.speed = Phaser.Math.Between(1, 14); } star.graphics.setPosition(star.x, star.y); });

        if (!this.isStarBaseHit) {
            if (!this.isMovingToCenter) {
                this.ship.setVelocityX(this.shipVelocityX);
                if (this.cursors.left.isDown) {
                    this.ship.setVelocityX(this.SHIP_VELOCITY * -1);
                } else if (this.cursors.right.isDown) {
                    this.ship.setVelocityX(this.SHIP_VELOCITY);
                } else {
                    this.ship.setVelocityX(this.shipVelocityX);
                }
            } else {
                // Schiff bewegt sich zur Mitte
                const targetX = this.cameras.main.width / 2;
                const distanceToTarget = Math.abs(this.ship.x - targetX);
                const speed = this.SHIP_VELOCITY * 0.5; // Langsamere Bewegung zur Mitte

                if (this.ship.x < targetX - 5) {
                    this.ship.setVelocityX(speed);
                } else if (this.ship.x > targetX + 5) {
                    this.ship.setVelocityX(-speed);
                } else {
                    this.ship.setVelocityX(0);
                    this.startFlyUpSequence();
                    this.isMovingToCenter = false; // Bewegung zur Mitte abgeschlossen
                }
            }
        }

        this.lasers.children.iterate((laser) => { if (laser && laser.y < 0) { laser.destroy(); } });

        if (this.shield <= 0 && !this.isGameOverSequence) { this.startGameOverSequence(); }
        if (this.score <= 0 && !this.isGameOverSequence) { this.startGameOverSequence(); }

        if (this.starbase.y < 240) {
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
                    const koreanFont = 'yoon-px-pixman, Monotype, sans-serif';
                    const germanFont = `"pixelify-sans", Monotype, sans-serif`;
                    const yPos = 30;
                    const textColor = '#12F1D3';
                    const hoverColor = '#ff0ff0';
                    const strokeColor = '#000000';
                    const strokeThickness = 4;

                    const koreanText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 8 + yPos + 60, this.koreanPart, { fontFamily: koreanFont, fontSize: "20px", fill: "#ffffff", stroke: strokeColor, strokeThickness: strokeThickness }).setOrigin(0.5, 1).setDepth(2).setAlpha(0);
                    const germanText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + yPos + 60, this.germanPart, { fontFamily: germanFont, fontSize: "20px", fill: "#ffffff", stroke: strokeColor, strokeThickness: strokeThickness }).setOrigin(0.5, 0.5).setDepth(2).setAlpha(0);
                    const koreanTranslationText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 8 + yPos + 60, this.koreanTranslationPart, { fontFamily: koreanFont, fontSize: "20px", fill: "#ffffff", stroke: strokeColor, strokeThickness: strokeThickness }).setOrigin(0.5, 0).setDepth(2).setAlpha(0);

                    const rectWidth = Math.max(koreanText.width, germanText.width, koreanTranslationText.width) + 20;
                    const rectHeight = koreanText.height + germanText.height + koreanTranslationText.height + 20;
                    const rectX = this.cameras.main.width / 2;
                    const rectY = this.cameras.main.height / 2 + yPos + 60 - rectHeight / 2;
                    const backgroundRect = this.add.rectangle(rectX, rectY + yPos + 25, rectWidth, rectHeight, 0x000000, 0.7).setOrigin(0.5).setDepth(1).setAlpha(0);
                    const buttonY = rectY + rectHeight / 2 + 70;

                    const fadeOutButton = this.add.text(this.cameras.main.width / 2 - 100, buttonY, 'darüber', { fontFamily: koreanFont, fontSize: "20px", fill: textColor, stroke: strokeColor, strokeThickness: strokeThickness })
                        .setOrigin(0.5)
                        .setInteractive()
                        .setDepth(2)
                        .setAlpha(0)
                        .on('pointerdown', () => {
                            this.beepSound.play()
                            this.questionAsked = false;
                            const failureNotification = new Notification(this, "틀렸습니다. 안녕히 계십시오.")
                            this.time.delayedCall(700, () => { 
                                failureNotification.display()
                                this.sound.play('pickedWrongPrepositionSound')
                            }, [], this)
                            this.tweens.add({
                                targets: [backgroundRect, koreanText, germanText, koreanTranslationText, fadeOutButton, changeSceneButton],
                                alpha: 0,
                                duration: 1000,
                                onComplete: () => {
                                    backgroundRect.destroy();
                                    koreanText.destroy();
                                    germanText.destroy();
                                    koreanTranslationText.destroy();
                                    fadeOutButton.destroy();
                                    changeSceneButton.destroy();
                                }
                            });
                            this.starbase.setVelocityY(120)
                            this.time.delayedCall(4000, () => {
                                this.scene.start("WrongAnswer")
                            }, [], this)
                        })
                        .on('pointerover', () => {
                            fadeOutButton.setStyle({ fill: '#ff0ff0' });
                            this.consoleClickSound.play()
                        })
                        .on('pointerout', () => { fadeOutButton.setStyle({ fill: '#12F1D3' }); });

                    const changeSceneButton = this.add.text(this.cameras.main.width / 2 + 100, buttonY, 'darauf', { fontFamily: koreanFont, fontSize: "20px", fill: textColor, stroke: strokeColor, strokeThickness: strokeThickness })
                        .setOrigin(0.5)
                        .setInteractive()
                        .setDepth(2)
                        .setAlpha(0)
                        .on('pointerdown', () => {
                            this.beepSound.play()
                            this.questionAsked = false;
                            this.tweens.add({
                                targets: [backgroundRect, koreanText, germanText, koreanTranslationText, fadeOutButton, changeSceneButton],
                                alpha: 0,
                                duration: 1000,
                                onComplete: () => {
                                    backgroundRect.destroy();
                                    koreanText.destroy();
                                    germanText.destroy();
                                    koreanTranslationText.destroy();
                                    fadeOutButton.destroy();
                                    changeSceneButton.destroy();
                                }
                            });
                            this.disableShipInput();
                            this.time.delayedCall(1000, () => { 
                                this.starbaseDoorOpenSound.play()
                                this.isMovingToCenter = true; // Starte die Bewegung zur Mitte
                            }, [ ], this)// Deaktiviere die Bewegung des Schiffs
                        })
                        .on('pointerover', () => {
                            changeSceneButton.setStyle({ fill: '#ff0ff0' });
                            this.consoleClickSound.play()
                        })
                        .on('pointerout', () => {changeSceneButton.setStyle({ fill: '#12F1D3' });});

                    this.tweens.add({
                        targets: [backgroundRect, koreanText, germanText, koreanTranslationText, fadeOutButton, changeSceneButton],
                        alpha: 1,
                        duration: 1000,
                        ease: 'Linear'
                    });
                }, [], this)
            }
        }
    }

    disableShipInput() {
        this.cursors.left.isDown = false;
        this.cursors.right.isDown = false;
        this.input.keyboard.removeListener('keydown-SPACE', this.shootLasers, this);
    }

    enableShipInput() {
        this.input.keyboard.on('keydown-SPACE', this.shootLasers, this);
    }

    startFlyUpSequence() {
        const targetY = this.starbase.y + this.starbase.height * 0.06 / 2 - this.ship.height * this.ship.scaleY / 2;
        this.physics.world.disable(this.ship);
        this.tweens.add({
            targets: this.ship,
            y: targetY,
            duration: 3000,
            ease: 'Linear',
            onUpdate: () => {
                const shipBounds = this.ship.getBounds();
                const starbaseBounds = this.starbase.getBounds();

                if (shipBounds.bottom < starbaseBounds.top + 20) {
                    if (!this.ship.mask) {
                        const mask = this.starbase.createBitmapMask();
                        this.ship.setMask(mask);
                        this.ship.setDepth(1); // Ensure ship is behind the starbase visually after masking
                        this.starbase.setDepth(2); // Ensure starbase is on top
                    }
                }
            },
            onComplete: () => {
                this.ship.clearMask();
                this.scene.start('StarBase');
            },
            callbackScope: this
        });
    }

    startGameOverSequence() {
        this.isGameOverSequence = true;
        this.lasers.clear(true, true);
        this.bgMusic.stop();
        this.ship.setVelocityX(0);
        this.time.delayedCall(300, () => {
            const explosion = this.physics.add.sprite(this.ship.x, this.ship.y, 'shipExplosion').setScale(this.SHIP_SCALE * 20);
            explosion.play('shipExplode');
            this.shipExplosionSound.play();
            this.ship.setVisible(false);
            const explosionDuration = this.anims.get('shipExplode').duration;
            const soundDuration = this.shipExplosionSound.duration() * 1000;
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
        if (this.canShoot && this.lasers.getLength() <= this.lasers.maxSize - (GameStore.sceneConfig.yLaser ? 4 : 2)) {
            this.canShoot = false;

            const shipWidth = this.ship.width * this.ship.scaleX;
            const laserKey = GameStore.sceneConfig.plasmaBeam ? 'plasmaLaser' : 'laser';
            const scaleKey = GameStore.sceneConfig.plasmaBeam ? GameStore.sceneConfig.plasmaScale : GameStore.sceneConfig.laserScale;
            const laserSpeed = -this.laserSpeed;

            // Normale Laser (immer vertikal)
            const leftLaser = this.lasers.get();
            if (leftLaser) {
                this.fireLaser(leftLaser, this.ship.x - shipWidth / 2, this.ship.y - 10, 0, laserSpeed, laserKey, scaleKey, 0); // Winkel explizit auf -90 gesetzt
            }
            const rightLaser = this.lasers.get();
            if (rightLaser) {
                this.fireLaser(rightLaser, this.ship.x + shipWidth / 2, this.ship.y - 10, 0, laserSpeed, laserKey, scaleKey, 0); // Winkel explizit auf -90 gesetzt
            }

            // Y-Laser (wenn Upgrade gekauft wurde)
            if (GameStore.sceneConfig.yLaser) {
                const diagonalSpeed = laserSpeed / Math.sqrt(2);

                const leftDiagonalLaser = this.lasers.get();
                if (leftDiagonalLaser) {
                    this.fireLaser(leftDiagonalLaser, this.ship.x + shipWidth, this.ship.y - 10, -diagonalSpeed, diagonalSpeed, laserKey, scaleKey); // Winkel wird in fireLaser berechnet
                }

                const rightDiagonalLaser = this.lasers.get();
                if (rightDiagonalLaser) {
                    this.fireLaser(rightDiagonalLaser, this.ship.x - shipWidth, this.ship.y - 10, diagonalSpeed, diagonalSpeed, laserKey, scaleKey); // Winkel wird in fireLaser berechnet
                }
            }

            this.time.delayedCall(this.shootDelay, () => {
                this.canShoot = true;
            }, [], this);
        }
    }

    fireLaser(laser, x, y, velocityX, velocityY, key, scale, forcedAngle = null) {
        laser.setActive(true);
        laser.setVisible(true);
        laser.setTexture(key);
        laser.setPosition(x, y);
        laser.setScale(scale);
        laser.setVelocity(velocityX, velocityY);

        if (forcedAngle !== null) {
            laser.angle = forcedAngle;
        } else {
            const angleRad = Math.atan2(velocityY, velocityX);
            const angleDeg = Phaser.Math.RadToDeg(angleRad);
            laser.angle = angleDeg + 90;
        }

        this.laserSound.play();
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
    }
}

export default PrepositionCruiser;