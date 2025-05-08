import GameStore from '../GameStore';
import { preloadAssets } from "../preload.js"
import Phaser from 'phaser'
import { Howl } from 'howler';
import fadeIn from '../func/fadeIn.js';
import ScoreTrigger from '../../classes/ScoreTrigger.js';
import PowerUpManager from '../../classes/PowerUpManager.js';
import PrepositionManager from '../../classes/PrepositionManager.js';

class Shooter extends Phaser.Scene {
    constructor() {
        super({ key: 'Shooter' });
        this.canShoot = true; // Flag, um zu steuern, ob geschossen werden darf
        this.shootDelay = 1; 
        this.currentVerb = GameStore.currentVerb 
        this.usedVerbs = GameStore.usedVerbs
        this.unusedVerbs = GameStore.unusedVerbs
        this.setCurrentVerb = () => {
        this.usedVerbs.push(this.currentVerb)
            GameStore.update({ usedVerbs: this.usedVerbs })
            const newVerb = GameStore.verbs[GameStore.usedVerbs.length];
            GameStore.update({ currentVerb: newVerb })
            this.currentVerb = newVerb
            console.log(this.usedVerbs)
        }

        this.scoreTrigger = new ScoreTrigger(this, {
            2500: {
                setCurrentVerb: true,
                displayAlert: () => `새로운미션:\n${this.currentVerb.verb}`, // Übergib eine Funktion
                playNewMissionSound: true,
                clearPrepositionGroup: true
            },
            3000: {
                setCurrentVerb: true,
                displayAlert: () => `새로운미션:\n${this.currentVerb.verb}`, // Übergib eine Funktion
                playNewMissionSound: true,
                clearPrepositionGroup: true
            },
            4000: {
                setCurrentVerb: true,
                displayAlert: () => `새로운미션:\n${this.currentVerb.verb}`, // Übergib eine Funktion
                playNewMissionSound: true,
                clearPrepositionGroup: true
            },
            4500: {
                displayAlert: '레벨업',
                setLevel: 1,
                levelUpSoundPlay: true,
            },
            5000: {
                setCurrentVerb: true,
                displayAlert: () => `새로운미션:\n${this.currentVerb.verb}`, // Übergib eine Funktion
                playNewMissionSound: true,
                clearPrepositionGroup: true
            },
            6000: {
                setCurrentVerb: true,
                displayAlert: () => `새로운미션:\n${this.currentVerb.verb}`, // Übergib eine Funktion
                playNewMissionSound: true,
                clearPrepositionGroup: true
            },
            7000: {
                setCurrentVerb: true,
                displayAlert: () => `새로운미션:\n${this.currentVerb.verb}`, // Übergib eine Funktion
                playNewMissionSound: true,
                clearPrepositionGroup: true
            },
            7500: {
                displayAlert: '레벨업',
                setLevel: 1,
                levelUpSoundPlay: true,
            },
            8000: {
                setCurrentVerb: true,
                displayAlert: () => `새로운미션:\n${this.currentVerb.verb}`, // Übergib eine Funktion
                playNewMissionSound: true,
                clearPrepositionGroup: true
            },
            9000: {
                setCurrentVerb: true,
                displayAlert: () => `새로운미션:\n${this.currentVerb.verb}`, // Übergib eine Funktion
                playNewMissionSound: true,
                clearPrepositionGroup: true
            },
            9500: {
                displayAlert: '레벨업',
                setLevel: 1,
                levelUpSoundPlay: true,
            },
            10000: {
                bgMusicStop: true,
                stopPowerupSpawner: true,
                stopPrepositionSpawner: true,
                isSpawningAsteroids: false,
                displayAlert: '레벨업',
                setLevel: 1,
                levelUpSoundPlay: true,
                clearPrepositionGroup: true,
                powerupsClear: true,
                asteroidsClear: true,
                changeScene: 'ApproachingStarBaseMonitor',
                changeSceneDelay: 3500
            },


            // Füge hier weitere Score-Schwellenwerte und Aktionen hinzu
        });

        this.powerupTimer = null;
        this.powerupImages = ['gold', 'lithium', 'plasma', 'titanium', 'iron', 'shield'];
        this.resourceMap = GameStore.resourceMap; // Define the maximum shield value
        this.hopeLossSound = null; // To hold the Howl sound for sadness
        this.gameOverSound = null;
        this.shipExplosionSound = null;
        this.isGameOverSequence = false;
        this.starBaseApproaching = false;

        this.displayAlert = (text) => {
            const centerX = this.cameras.main.width / 2;
            const centerY = this.cameras.main.height / 2;
            const alertText = this.add.text(centerX, centerY, text, { font: '80px yoon-px-pixman', fill: 'violet', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5).setDepth(1000);
            this.time.delayedCall(2500, () => {alertText.destroy()}, [], this)
        }

        this.level = GameStore.level

        this.setLevel = (amount) => {
            const newLevel = this.level + amount;
            GameStore.update({ level: newLevel });
            this.level = newLevel;
        };

        // for the right or wrong preposition dropping:
        this.prepositionGroup = null;
        this.prepositionSpawnTimer = null;
        this.PREPOSITION_SPAWN_INTERVAL = Phaser.Math.Between(2000, 5000); // Anpassen nach Bedarf
        this.PREPOSITION_SPEED = 200; // Geschwindigkeit an Powerups anpassen
        this.PREPOSITION_OVAL_COLOR = 0x88F8F4; // Maigrün als Hex-Code
        this.PREPOSITION_COLORS = []
        this.PREPOSITION_TEXT_STYLE = { font: '20px Arial', fill: '#000000', align: 'center' };
    }

    preload() {
        preloadAssets(this);
        // Load the sad sound
    }

    create() {

        fadeIn(this)

        this.nebularBG = this.add.tileSprite(400, 300, 800, 600, 'nebula')

        this.credits = GameStore.credits;
        this.score = GameStore.score;
        this.shield = GameStore.shield;
        this.VERB_LIST = GameStore.verbs
        this.laserSpeedUpdate = GameStore.laserSpeedUpdate;
        this.reduceShield = () => {
            const newShieldValue = Math.max(0, this.shield - 1);
            GameStore.update({ shield: newShieldValue });
            this.shield = newShieldValue;
        };

        this.isSpawningAsteroids = true

        this.setCredits = (amount) => {
            const newCreditsValue = Math.max(0, this.credits + amount);
            GameStore.update({ credits: newCreditsValue });
            this.credits = newCreditsValue;
        }

        this.setScore = (amount) => {
            const newScore = Math.max(0, this.score + amount);
            GameStore.update({ score: newScore });
            this.score = newScore;
        };

    this.explosionSound = new Howl({ src: ['audio/explosion.mp3'], volume: 1.0, onload: () => console.log('Explosion sound loaded'), onloaderror: (id, error) => console.error('Error loading explosion sound:', error) });
    this.laserSound = new Howl({ src: ['audio/laser.mp3'], volume: 1.0, onload: () => console.log('Laser sound loaded'), onloaderror: (id, error) => console.error('Error loading laser sound:', error) });
    this.bgMusic = new Howl({ src: ['audio/horizon_of_the_unknown.mp3'], volume: 1.0, onload: () => { console.log('Howl sound loaded'); this.bgMusic.play(); }, onloaderror: (id, error) => console.error('Error loading howl sound:', error) });
    this.hitSound = new Howl({ src: ['audio/hit.wav'], volume: 1.0, onload: () => console.log("hit sound loaded"), onloaderror: (id, error) => console.error('Error loading howl sound:', error) });
    this.powerupSound = new Howl({ src: ['audio/powerup.wav'], volume: 0.5, onload: () => console.log("powerup sound loaded"), onloaderror: (id, error) => console.error('Error loading howl sound:', error) });
    this.hopeLossSound = new Howl({ src: ['audio/hope_loss.mp3'], });
    this.gameOverSound = new Howl({ src: ['audio/8bit_synth_defeat.wav'], });
    this.shipExplosionSound = new Howl({ src: ['audio/shipExplosion.wav'], volume: 1, });
    this.levelUpSound = new Howl({ src: ['audio/level_up.wav'] })
    this.pickUpPowerUpSound = new Howl({ src: ['audio/pickup_powerup.wav'] })
    this.pickedRightPrepositionSound = new Howl({ src: ['audio/right_preposition.mp3'] })
    this.pickedWrongPrepositionSound = new Howl({ src: ['audio/wrong_preposition.mp3'] })
    this.newMissionSound = new Howl ({ src: ['audio/spell.wav']})

        
    this.NUMBER_OF_STARS = 1000;
    this.SHIP_VELOCITY = GameStore.sceneConfig.shipVelocity;
    this.LASER_SCALE = GameStore.sceneConfig.laserScale;
    this.SHIP_SCALE = GameStore.sceneConfig.shipScale;
    this.ASTEROID_ROTATION_SPEED = 500;
    this.ONE_ASTEROID_PER_MS = GameStore.sceneConfig.asteroidsPerMilliseconds;
    this.ASTEROID_MIN_SPEED = 120;
    this.ASTEROID_MAX_SPEED = 220;
    this.asteroidImages = ['asteroid1', 'asteroid2', 'asteroid3', 'asteroid4', 'asteroid5'];
    this.laserSpeed = 800 + this.laserSpeedUpdate;
    this.shipVelocityX = 0;
    this.stars = [];
    this.ship = this.physics.add.image(400, 550, 'shipP').setOrigin(0.5, 0.5).setCollideWorldBounds(true).setScale(this.SHIP_SCALE).setDepth(1);
    this.lasers = this.physics.add.group({ defaultKey: 'laser', maxSize: 6 });
    this.asteroids = this.physics.add.group();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown-SPACE', this.shootLasers, this);
    this.anims.create({ key: 'explode', frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }), frameRate: 20, repeat: false });
    this.anims.create({ key: 'shipExplode', frames: this.anims.generateFrameNumbers('shipExplosion', { start: 0, end: 20 }), frameRate: 25, repeat: false });
    for (let i = 0; i < this.NUMBER_OF_STARS; i++) { const star = this.createStar(); this.stars.push(star); }
    this.time.addEvent({ delay: this.ONE_ASTEROID_PER_MS, callback: this.spawnAsteroid, callbackScope: this, loop: true });
    this.physics.add.overlap(this.lasers, this.asteroids, this.hitAsteroid, null, this);
    this.physics.add.overlap(this.ship, this.asteroids, this.hitShip, null, this);
    this.physics.add.overlap(this.ship, this.powerups, this.collectPowerup, null, this); 


    //präpositions dropping
    this.prepositionGroup = this.physics.add.group();
    this.prepositionManager = new PrepositionManager(
        this,
        this.prepositionGroup,
        this.PREPOSITION_SPEED,
        this.PREPOSITION_OVAL_COLOR,
        this.PREPOSITION_TEXT_STYLE,
        this.pickedRightPrepositionSound,
        this.pickedWrongPrepositionSound
    );
    this.prepositionManager.startSpawner();
    this.physics.add.overlap(this.ship, this.prepositionGroup, this.prepositionManager.handleCollision, null, this.prepositionManager);


    this.powerups = this.physics.add.group(); // <-- DIESE ZEILE ENTFERNEN!!!
    this.powerUpManager = new PowerUpManager(
        this,
        this.powerups,
        this.ship,
        this.resourceMap,
        this.powerupImages,
        this.powerupSound,
        this.pickUpPowerUpSound
    );
    this.powerUpManager.startSpawner(); 
        this.physics.add.overlap(this.ship, this.powerups, this.powerUpManager.collect, null, this.powerUpManager);
        
}

    update() {

        
        this.nebularBG.setScale(2)
        this.nebularBG.setAlpha(0.5)
        this.nebularBG.tilePositionY -= 0.2;
        this.shield = GameStore.shield;
            this.scoreTrigger.checkScore();

        this.ship.setVelocityX(this.shipVelocityX);
        if (this.cursors.left.isDown) { this.ship.setVelocityX(this.SHIP_VELOCITY * -1); } else if (this.cursors.right.isDown) { this.ship.setVelocityX(this.SHIP_VELOCITY); } else { this.ship.setVelocityX(this.shipVelocityX); }
        this.lasers.children.iterate((laser) => { if (laser && laser.y < 0) { laser.destroy(); } });
        this.stars.forEach((star) => { star.y += star.speed; if (star.y > 600) { star.y = 0; star.x = Phaser.Math.Between(0, 800); star.speed = Phaser.Math.Between(1, 14); } star.graphics.setPosition(star.x, star.y); });
        this.asteroids.children.iterate((asteroid) => {
            if (asteroid) {
                const scaleChange = 0.001;
                asteroid.scale += asteroid.scaleDirection * scaleChange;
                if (asteroid.scale >= asteroid.originalScale * 1.1) {
                    asteroid.scale = asteroid.originalScale * 1.1;
                } else if (asteroid.scale <= asteroid.originalScale * 0.9) {
                    asteroid.scale = asteroid.originalScale * 0.9;
                }

                // Check if the asteroid has passed the bottom of the screen
                if (asteroid.y > 650) {
                    const newScore = Math.max(0, GameStore.score - GameStore.sceneConfig.asteroidFlyThroughMalus);
                    GameStore.update({ score: newScore }); // Reduce score, but not below 0
                    this.score = newScore; // Update local score
                    this.hopeLossSound.play(); // Play the sad sound
                    asteroid.destroy(); // Destroy the asteroid
                }
            }
        });

        this.powerups.children.iterate((powerup) => { if (powerup && powerup.y > 650) { powerup.destroy(); } });// Destroy power-ups that go off-screen
        this.prepositionGroup.children.iterate((preposition) => {
            if (preposition && preposition.y > 650) {
                preposition.destroy();
            }
        });


      this.scoreTrigger.checkScore();

        if (this.shield <= 0 && !this.isGameOverSequence) {
            this.startGameOverSequence();
        }
        if (this.score <= 0 && !this.isGameOverSequence) {
            this.startGameOverSequence();
        }

        // prepositions dropping
    }

    startGameOverSequence() {
        this.isGameOverSequence = true;
        this.stopPowerupSpawner();
        this.asteroids.clear(true, true);
        this.lasers.clear(true, true);
        this.powerups.clear(true, true);
        this.bgMusic.stop();
        this.ship.setVelocityX(0);
        this.ship.setVisible(false); // Hide the ship immediately

        // Play ship explosion animation
        const explosion = this.physics.add.sprite(this.ship.x, this.ship.y, 'shipExplosion').setScale(this.SHIP_SCALE * 20); // Adjust scale as needed
        explosion.play('shipExplode');
        this.shipExplosionSound.play();

        // Wait for the animation and sound to finish before starting the game over scene
        const explosionDuration = this.anims.get('shipExplode').duration;
        const soundDuration = this.shipExplosionSound.duration() * 1000; // Convert to milliseconds
        const delay = Math.max(explosionDuration, soundDuration);

        this.time.delayedCall(delay, () => {
            this.gameOverSound.play();
            this.scene.start('GameOver');
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

    spawnAsteroid() {
        if (this.isSpawningAsteroids) {
            const MIN_DISTANCE = 50;
            let x, y;
            let isValidPosition = false;
            while (!isValidPosition) {
                x = Phaser.Math.Between(0, 800);
                y = 0;
                isValidPosition = true;
                this.asteroids.children.iterate((existingAsteroid) => {
                    const distance = Phaser.Math.Distance.Between(x, y, existingAsteroid.x, existingAsteroid.y);
                    if (distance < MIN_DISTANCE) {
                        isValidPosition = false;
                    }
                });
            }
            const randomAsteroidImage = this.asteroidImages[Phaser.Math.Between(0, this.asteroidImages.length - 1)];
            const asteroid = this.asteroids.create(x, y, randomAsteroidImage);
            asteroid.setScale(0.47);
            asteroid.originalScale = asteroid.scale;
            const randomSpeed = Phaser.Math.Between(this.ASTEROID_MIN_SPEED, this.ASTEROID_MAX_SPEED);
            asteroid.setVelocityY(randomSpeed);
            const randomRotationSpeed = Phaser.Math.Between(this.ASTEROID_ROTATION_SPEED * -1, this.ASTEROID_ROTATION_SPEED);
            asteroid.setAngularVelocity(randomRotationSpeed);
            asteroid.scaleDirection = Math.random() < 0.5 ? 1 : -1;
    
            // Füge den Trefferzähler und Flacker-Status hinzu
            asteroid.hits = 0;
            asteroid.isFlickering = false;
            

        } else return
    }

    stopPowerupSpawner() { // Weiterhin in der Szene, um den Aufruf vom ScoreTrigger zu ermöglichen
        this.powerUpManager.stopSpawner();
    }

    stopPrepositionSpawner() { // Weiterhin in der Szene
        this.prepositionManager.stopSpawner();
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

  hitAsteroid(laser, asteroid) {
        const asteroidCenterX = asteroid.x;
        const asteroidCenterY = asteroid.y;
        const laserX = laser.x;
        const laserY = laser.y;
        const distance = Phaser.Math.Distance.Between(laserX, laserY, asteroidCenterX, asteroidCenterY);
        const asteroidWidth = asteroid.width;
        const asteroidHeight = asteroid.height;
        const radius = Math.min(asteroidWidth, asteroidHeight) / 2;
        const collisionThreshold = radius * 0.75;

        if (distance < collisionThreshold) {
            laser.destroy();
            asteroid.hits++;

            if (GameStore.sceneConfig.plasmaBeam) {
                // Plasma Beam ist aktiv: Explodiere nach dem ersten Treffer
                const explosion = this.physics.add.sprite(asteroid.x, asteroid.y, 'explosion');
                explosion.play('explode');
                explosion.setScale(2);
                this.explosionSound.play();
                explosion.on('animationcomplete', () => {
                    explosion.destroy();
                });
                if (asteroid.flickerInterval) {
                    clearInterval(asteroid.flickerInterval);
                }
                asteroid.destroy();
                this.setScore(GameStore.sceneConfig.asteroidDestroyBonus.score);
                this.setCredits(GameStore.sceneConfig.asteroidDestroyBonus.credits);
            } else {
                // Plasma Beam ist nicht aktiv: Flackern nach 1 oder 2 Treffern, Explosion nach 3
                if (asteroid.hits < GameStore.sceneConfig.hitsToDestroyAsteroid && !asteroid.isFlickering) {
                    // Flackern starten
                    asteroid.isFlickering = true;
                    const originalAlpha = asteroid.alpha;
                    let flickerCount = 0;
                    const flickerInterval = setInterval(() => {
                        asteroid.alpha = asteroid.alpha === 1 ? 0.2 : 1;
                        flickerCount++;
                        if (flickerCount >= 10) { // Flackert für ca. 1 Sekunde
                            clearInterval(flickerInterval);
                            asteroid.alpha = originalAlpha;
                            asteroid.isFlickering = false;
                        }
                    }, 100);
                    asteroid.flickerInterval = flickerInterval;
                } else if (asteroid.hits >= GameStore.sceneConfig.hitsToDestroyAsteroid) {
                    // Zerstören nach dem dritten Treffer
                    const explosion = this.physics.add.sprite(asteroid.x, asteroid.y, 'explosion');
                    explosion.play('explode');
                    explosion.setScale(2);
                    this.explosionSound.play();
                    explosion.on('animationcomplete', () => {
                        explosion.destroy();
                    });
                    if (asteroid.flickerInterval) {
                        clearInterval(asteroid.flickerInterval);
                    }
                    asteroid.destroy();
                    this.setScore(GameStore.sceneConfig.asteroidDestroyBonus.score);
                    this.setCredits(GameStore.sceneConfig.asteroidDestroyBonus.credits);
                }
            }
        }
    }

    

    hitShip(ship, asteroid) {
        if (!this.isGameOverSequence) {
            this.flickerShip();
            this.hitSound.play();
            this.reduceShield();
            asteroid.destroy();
            if (this.shield <= 0) {
                this.startGameOverSequence();
            }
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

    bgMusicStop() {
        this.bgMusic.stop();
    }
    levelUpSoundPlay() {
        this.levelUpSound.play();
    }
    powerupsClear() {
        this.powerups.clear(true, true);
    }
    asteroidsClear() {
        this.asteroids.clear(true, true);
    }

}

export default Shooter;