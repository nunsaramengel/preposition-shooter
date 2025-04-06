import GameStore from '../GameStore';
import { preloadAssets } from "../preload.js"
import Phaser from 'phaser'
import { Howl } from 'howler';

class Shooter extends Phaser.Scene {
    constructor() {
        super({ key: 'Shooter' });
        this.powerupTimer = null;
        this.powerups = null;
        this.powerupImages = ['alu', 'eisen', 'gold', 'plastik', 'shield', 'titan'];
        this.resourceMap = {
            'alu': { key: 'resources', id: 1, amount: 5 },     // Aluminium
            'eisen': { key: 'resources', id: 7, amount: 3 },   // Eisen
            'gold': { key: 'resources', id: 0, amount: 10 },  // Gold
            'plastik': { key: 'resources', id: 12, amount: 2 }, // Plastik
            'shield': { key: 'shield', amount: 5 },           // Shield
            'titan': { key: 'resources', id: 2, amount: 7 }    // Titan
        };
        this.MAX_SHIELD = 10; // Define the maximum shield value
        this.failureDrumSound = null; // To hold the Howl sound for sadness
        this.gameOverSound = null;
        this.shipExplosionSound = null;
        this.isGameOverSequence = false;
    }

    preload() {
        preloadAssets(this); // Load the sad sound
    }

    create() {
        this.score = GameStore.score;
        this.shield = GameStore.shield;

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
        this.powerupSound = new Howl({ src: ['audio/powerup.wav'], volume: 0.5, onload: () => console.log("powerup sound loaded"), onloaderror: (id, error) => console.error('Error loading howl sound:', error) });
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
        this.ASTEROID_ROTATION_SPEED = 500;
        this.ONE_ASTEROID_PER_MS = 1200;
        this.ASTEROID_MIN_SPEED = 200;
        this.ASTEROID_MAX_SPEED = 400;
        this.asteroidImages = ['asteroid1', 'asteroid2', 'asteroid3', 'asteroid4', 'asteroid5'];
        this.laserSpeed = 1100;
        this.shipVelocityX = 0;
        this.stars = [];
        this.ship = this.physics.add.image(400, 550, 'ship').setOrigin(0.5, 0.5).setCollideWorldBounds(true).setScale(this.SHIP_SCALE).setDepth(1);
        this.lasers = this.physics.add.group({ defaultKey: 'laser', maxSize: 10 });
        this.asteroids = this.physics.add.group();
        this.powerups = this.physics.add.group();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', this.shootLasers, this);
        this.anims.create({ key: 'explode', frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }), frameRate: 20, repeat: false });
        this.anims.create({ key: 'shipExplode', frames: this.anims.generateFrameNumbers('shipExplosion', { start: 0, end: 20 }), frameRate: 25, repeat: false });
        for (let i = 0; i < this.NUMBER_OF_STARS; i++) { const star = this.createStar(); this.stars.push(star); }
        this.time.addEvent({ delay: this.ONE_ASTEROID_PER_MS, callback: this.spawnAsteroid, callbackScope: this, loop: true });
        this.physics.add.overlap(this.lasers, this.asteroids, this.hitAsteroid, null, this);
        this.physics.add.overlap(this.ship, this.asteroids, this.hitShip, null, this);
        this.physics.add.overlap(this.ship, this.powerups, this.collectPowerup, null, this); // Add overlap for powerups

        // Start spawning power-ups randomly
        this.startPowerupSpawner();
    }

    startPowerupSpawner() {
        const spawnInterval = Phaser.Math.Between(3000, 7000);
        this.powerupTimer = this.time.addEvent({
            delay: spawnInterval,
            callback: this.spawnPowerup,
            callbackScope: this,
            loop: true
        });
    }

    stopPowerupSpawner() {
        if (this.powerupTimer) {
            this.powerupTimer.destroy();
            this.powerupTimer = null;
        }
    }

    spawnPowerup() {
        const x = Phaser.Math.Between(50, 750); // Spawn within the game width
        const y = -50; // Start above the screen

        const randomPowerupImage = this.powerupImages[Phaser.Math.Between(0, this.powerupImages.length - 1)];
        const powerup = this.powerups.create(x, y, randomPowerupImage);
        powerup.setScale(0.3); // Adjust scale as needed
        powerup.setVelocityY(Phaser.Math.Between(this.ASTEROID_MIN_SPEED, this.ASTEROID_MAX_SPEED)); // Match asteroid speed
    }

    collectPowerup(ship, powerup) {
        const powerupKey = powerup.texture.key;
        const powerupData = this.resourceMap[powerupKey];

        if (powerupData) {
            this.powerupSound.play();
            if (powerupData.key === 'resources') {
                const currentResources = [...GameStore.resources];
                const resourceIndex = currentResources.findIndex(r => r.id === powerupData.id);
                if (resourceIndex !== -1) {
                    currentResources[resourceIndex].currentValue += powerupData.amount;
                    GameStore.update({ resources: currentResources });
                    console.log(`Collected ${powerupKey}, increased resource ${powerupData.id} by ${powerupData.amount}`);
                }
            } else if (powerupData.key === 'shield') {
                // Calculate the new shield value, ensuring it doesn't exceed MAX_SHIELD
                const newShield = Math.min(this.MAX_SHIELD, GameStore.shield + powerupData.amount);
                GameStore.update({ shield: newShield });
                this.shield = newShield; // Update local shield
                console.log(`Collected ${powerupKey}, increased shield by ${powerupData.amount}`);
            }
            powerup.destroy();
        }
    }

    update() {
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
                    const newScore = Math.max(0, GameStore.score - 500);
                    GameStore.update({ score: newScore }); // Reduce score, but not below 0
                    this.score = newScore; // Update local score
                    this.failureDrumSound.play(); // Play the sad sound
                    asteroid.destroy(); // Destroy the asteroid
                }
            }
        });
        this.powerups.children.iterate((powerup) => { if (powerup && powerup.y > 650) { powerup.destroy(); } }); // Destroy power-ups that go off-screen
        if (this.shield <= 0 && !this.isGameOverSequence) {
            this.startGameOverSequence();
        }
        if (this.score <= 0 && !this.isGameOverSequence) {
            this.startGameOverSequence();
        }
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
            const explosion = this.physics.add.sprite(asteroid.x, asteroid.y, 'explosion');
            explosion.play('explode');
            explosion.setScale(2)
            this.explosionSound.play();
            explosion.on('animationcomplete', () => {
                explosion.destroy();
            });
            laser.destroy();
            asteroid.destroy();
            this.setScore(100);
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
}

export default Shooter;