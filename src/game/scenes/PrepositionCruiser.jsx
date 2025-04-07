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
    }

    preload() {
        preloadAssets(this)
    }

    create() {
        this.score = GameStore.score;
        this.shield = GameStore.shield;
        this.question;


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

        // Füge eine einfache Bewegung nach unten hinzu
 

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

        
        

        if (this.starbase.y < 200 ) {
            this.starbase.setVelocityY(50)
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
            this.isStarbaseHit = false;
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