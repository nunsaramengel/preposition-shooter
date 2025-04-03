import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { Howl } from 'howler';
import "../styles/App.css";
import { preloadAssets } from '../phaser/preloadAssets';
import Resources from './Resources';

const Game = ({ score, setScore, children, shield, setShield }) => {
    let explosionSound, laserSound, howlSound; // Added howlSound

    const NUMBER_OF_STARS = 1000;
    const SHIP_VELOCITY = 600;
    const LASER_SCALE = 0.15;
    const SHIP_SCALE = 0.19;
    const ASTEROID_ROTATION_SPEED = 500;
    const ONE_ASTEROID_PER_MS = 1200;

    const asteroidImages = [
        'asteroid1',
        'asteroid2',
        'asteroid3',
        'asteroid4',
        'asteroid5',
    ];

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
            scene: {
                preload: function () {
                    preloadAssets(this)
                },
                create: create,
                update: update,
            },
        };

        const game = new Phaser.Game(config);
        let ship;
        let cursors;
        let lasers;
        let asteroids;
        let stars = [];
        let laserSpeed = 1100;

        game.canvas.id = 'game-canvas';

        let shipVelocityX = 0;

    // Device orientation variables
        const handleOrientation = (event) => {
            const { beta } = event; // beta represents the tilt in the front-to-back direction
            if (beta) {
                // Map the beta value to a range for ship movement
                const tiltThreshold = 10; // Adjust this value as needed
                if (beta > tiltThreshold) {
                    shipVelocityX = SHIP_VELOCITY; // Move right
                } else if (beta < -tiltThreshold) {
                    shipVelocityX = -SHIP_VELOCITY; // Move left
                } else {
                    shipVelocityX = 0; // No movement
                }
            }
            console.log(`Beta: ${beta}, Ship Velocity X: ${shipVelocityX}`); // Debugging line
        };  

    // Add event listener for device orientation
    window.addEventListener('deviceorientation', handleOrientation);


        function create() {
            explosionSound = new Howl({
                src: ['audio/explosion.mp3'],
                volume: 1.0,
                onload: () => {
                    console.log('Explosion sound loaded');
                },
                onloaderror: (id, error) => {
                    console.error('Error loading explosion sound:', error);
                },
            });

            laserSound = new Howl({
                src: ['audio/laser.mp3'],
                volume: 1.0,
                onload: () => {
                    console.log('Laser sound loaded');
                },
                onloaderror: (id, error) => {
                    console.error('Error loading laser sound:', error);
                },
            });

            howlSound = new Howl({ // Create Howl instance for the new sound
                src: ['audio/horizon_of_the_unknown.mp3'],
                volume: 1.0,
                onload: () => {
                    console.log('Howl sound loaded');
                    howlSound.play(); // Play the sound immediately after loading
                },
                onloaderror: (id, error) => {
                    console.error('Error loading howl sound:', error);
                },
            });

            // Create stars first
            for (let i = 0; i < NUMBER_OF_STARS; i++) {
                const star = createStar.call(this);
                stars.push(star);
            }

            // Create the starship
            ship = this.physics.add.image(400, 550, 'ship').setOrigin(0.5, 0.5);
            ship.setCollideWorldBounds(true);
            ship.setScale(SHIP_SCALE);
            ship.setDepth(1);

            // Create lasers group
            lasers = this.physics.add.group({
                defaultKey: 'laser',
                maxSize: 10,
            });

                       // Create asteroids group
            asteroids = this.physics.add.group();

            // Input events
            cursors = this.input.keyboard.createCursorKeys();
            this.input.keyboard.on('keydown-SPACE', shootLasers, this); // Listen for space bar press
            
            this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
                frameRate: 20, 
                repeat: false
            });

            // Spawn asteroids
            this.time.addEvent({
                delay: ONE_ASTEROID_PER_MS,
                callback: spawnAsteroid,
                callbackScope: this,
                loop: true,
            });

            // Collision detection
            this.physics.add.overlap(lasers, asteroids, hitAsteroid, null, this);
        }

        function update() {

            ship.setVelocityX(shipVelocityX)
            // Move the starship
            if (cursors.left.isDown) {
                ship.setVelocityX(SHIP_VELOCITY * -1);
            } else if (cursors.right.isDown) {
                ship.setVelocityX(SHIP_VELOCITY);
            } else {
                ship.setVelocityX(shipVelocityX);
            }

            // Update laser positions and destroy if off-screen
            lasers.children.iterate((laser) => {
                if (laser && laser.y < 0) {
                    laser.destroy(); // Remove laser if it goes off screen
                }
            });

            // Update star positions
            stars.forEach((star) => {
                star.y += star.speed; // Move star downwards
                if (star.y > 600) { // If star goes off screen
                    star.y = 0; // Reset to top
                    star.x = Phaser.Math.Between(0, 800); // Random x position
                    star.speed = Phaser.Math.Between(1, 14); // Random speed
                }
                star.graphics.setPosition(star.x, star.y); // Update star graphics position
            });
        }

        function createStar() {
            const x = Phaser.Math.Between(0, 800);
            const y = Phaser.Math.Between(0, 600);
            const size = Phaser.Math.Between(0.4, 1.3); // Random size for the star
            const speed = Phaser.Math.Between(1, 6); // Random speed for the star

            // Create a graphics object for the star
            const graphics = this.add.graphics();
            graphics.fillStyle(0xffffff, 1); // White color for the star
            graphics.fillCircle(x, y, size); // Draw the star

            // Return an object representing the star
            return { x, y, size, speed, graphics };
        }

function spawnAsteroid() {
    const MIN_DISTANCE = 50; // Minimum distance between asteroids
    let x, y;
    let isValidPosition = false;

    // Try to find a valid position for the new asteroid
    while (!isValidPosition) {
        x = Phaser.Math.Between(0, 800);
        y = 0; // All asteroids start from the top

        // Check if the new position is valid
        isValidPosition = true;
        asteroids.children.iterate((existingAsteroid) => {
            const distance = Phaser.Math.Distance.Between(x, y, existingAsteroid.x, existingAsteroid.y);
            if (distance < MIN_DISTANCE) {
                isValidPosition = false; // Found an existing asteroid too close
            }
        });
    }

    // Randomly select one asteroid image from the array
    const randomAsteroidImage = asteroidImages[Phaser.Math.Between(0, asteroidImages.length - 1)];
    const asteroid = asteroids.create(x, y, randomAsteroidImage);

    // Scale the asteroid to 2/3 of its original size
    asteroid.setScale(0.47);

    // Set random vertical speed between 50 and 150
    const randomSpeed = Phaser.Math.Between(50, 150);
    asteroid.setVelocityY(randomSpeed);

    // Set random angular velocity for rotation
    const randomRotationSpeed = Phaser.Math.Between(ASTEROID_ROTATION_SPEED * -1, ASTEROID_ROTATION_SPEED);
    asteroid.setAngularVelocity(randomRotationSpeed);
}


        function shootLasers() {
            if (lasers.getLength() < lasers.maxSize) {
                // Get the width of the ship
                const shipWidth = ship.width * ship.scaleX; // Adjust for scaling

                // Create left laser
                const leftLaser = lasers.get();
                if (leftLaser) {
                    leftLaser.setActive(true);
                    leftLaser.setVisible(true);
                    leftLaser.setPosition(ship.x - shipWidth / 2 + 35, ship.y + 10);
                    leftLaser.setScale(LASER_SCALE);
                    leftLaser.setVelocityY(-laserSpeed);
                    laserSound.play();
                }

                // Create right laser
                const rightLaser = lasers.get();
                if (rightLaser) {
                    rightLaser.setActive(true);
                    rightLaser.setVisible(true);
                    rightLaser.setPosition(ship.x + shipWidth / 2 - 35, ship.y + 10);
                    rightLaser.setScale(LASER_SCALE);
                    rightLaser.setVelocityY(-laserSpeed);
                    laserSound.play();
                }
            }
        }

        function hitAsteroid(laser, asteroid) {
            const asteroidCenterX = asteroid.x
                        const asteroidCenterY = asteroid.y;

            // Get the position of the laser
            const laserX = laser.x;
            const laserY = laser.y;

            // Calculate the distance between the laser and the center of the asteroid
            const distance = Phaser.Math.Distance.Between(laserX, laserY, asteroidCenterX, asteroidCenterY);

            // Define the size of the asteroid (assuming it's a square sprite)
            const asteroidWidth = asteroid.width; // Width of the asteroid sprite
            const asteroidHeight = asteroid.height; // Height of the asteroid sprite

            // Calculate the radius (you can use either width or height, assuming they are similar)
            const radius = Math.min(asteroidWidth, asteroidHeight) / 2;

            // Define a threshold for the collision (3/4 of the radius)
            const collisionThreshold = radius * 0.75; // 3/4 of the radius

            // Check if the distance is less than the threshold
            if (distance < collisionThreshold) {
                const explosion = this.physics.add.sprite(asteroid.x, asteroid.y, 'explosion');
                explosion.play('explode');

                explosionSound.play();

                explosion.on('animationcomplete', () => {
                    explosion.destroy();
                });

                laser.destroy();
                asteroid.destroy();
                setScore(prev => prev + 100);
            }
        }

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation)
            game.destroy(true); // Clean up the game instance on component unmount
        };
    }, []);

    const reduceShield = (e, value) => {
        e.preventDefault()
        if (shield - value > 0) {
            
            setShield(prev => prev - value)
        }
        console.log("shield value:", shield)
    }

    const increaseShield = (e, value) => {
        e.preventDefault()
        if (shield + value < 10) {
            
            setShield(prev => prev + value)
        }
        console.log("shield value:", shield)
    }

    return (
        <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column", width: "100%", height: "100%", margin: "0" }}>
            <div id="game" style={{ margin: "0", padding: "0" }}>
                {/* The Phaser game will be rendered here */}
            <Resources />
            </div>
            <div id="info-panel" style={{ width: "200px",  margin: "0", padding: "0" }}>
                {children}
            </div>
        </div>
    );
};

export default Game;


