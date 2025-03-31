import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { How } from 'howler'

const Game = ({score, setScore}) => {


    let explosionSound, laserSound;

    const NUMBER_OF_STARS = 1000;


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
        preload: preload,
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
    let laserSpeed = 600;

    function preload() {
        // Load assets here
        // IMAGES
        this.load.image('ship', 'img/ship.png'); // Your starship image
        this.load.image('laser', 'img/laser.png'); // Your laser image
        this.load.image('asteroid', 'img/asteroid.png'); // Your asteroid image
        this.load.spritesheet('explosion', 'img/explosion.png', { frameWidth: 64, frameHeight: 64 })
        
        // AUDIO
        this.load.audio('explosionSound', 'audio/explosion.mp3');
        this.load.audio('laserSound', 'audio/laser.mp3')

        console.log("Assets loaded.")
    }

      function create() {
        
        explosionSound = new Howl({
            src: ['audio/explosion.mp3'], // Path to your audio file
            volume: 1.0, // Set volume (0.0 to 1.0)
            onload: () => {
            console.log('Explosion sound loaded');
            },
            onloaderror: (id, error) => {
            console.error('Error loading explosion sound:', error);
                },
            
        });
          
        laserSound = new Howl({
            src: ['audio/laser.mp3'], // Path to your audio file
            volume: 1.0, // Set volume (0.0 to 1.0)
            onload: () => {
            console.log('Laser sound loaded');
            },
            onloaderror: (id, error) => {
            console.error('Error loading laser sound:', error);
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
      ship.setScale(0.4);
      ship.setDepth(1); // Set depth to ensure the ship is drawn above the stars

      // Create lasers group
      lasers = this.physics.add.group({
        defaultKey: 'laser',
        maxSize: 100, // Increased max size for more lasers
      });

      // Create asteroids group
      asteroids = this.physics.add.group();

      // Input events
      cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', shootLasers, this); // Listen for space bar press
        
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 15 }),
            
            frameRate: 20, repeat: false
      })

      // Spawn asteroids
      this.time.addEvent({
        delay: 1000,
        callback: spawnAsteroid,
        callbackScope: this,
        loop: true,
      });

      // Collision detection
      this.physics.add.overlap(lasers, asteroids, hitAsteroid, null, this);
    }

    function update() {
      // Move the starship
      if (cursors.left.isDown) {
        ship.setVelocityX(-300);
      } else if (cursors.right.isDown) {
        ship.setVelocityX(300);
      } else {
        ship.setVelocityX(0);
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
          star.speed = Phaser.Math.Between(1, 6); // Random speed
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
      const x = Phaser.Math.Between(0, 800);
      const asteroid = asteroids.create(x, 0, 'asteroid');

      // Scale the asteroid to 2/3 of its original size
      asteroid.setScale(0.67);

      // Set random vertical speed between 50 and 150 (halved from 100-300)
      const randomSpeed = Phaser.Math.Between(50, 150);
      asteroid.setVelocityY(randomSpeed);

      // Set random angular velocity for rotation (clockwise or counterclockwise)
      const randomRotationSpeed = Phaser.Math.Between(-100, 100); // Keep the range the same for rotation
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
        // Adjust the position to move the left laser more to the right and down
        leftLaser.setPosition(ship.x - shipWidth / 2 + 35, ship.y +10); // Position to the left edge of the ship
        leftLaser.setVelocityY(-laserSpeed);
        }

        // Create right laser
        const rightLaser = lasers.get();
        if (rightLaser) {
        rightLaser.setActive(true);
        rightLaser.setVisible(true);
        // Adjust the position to move the right laser more to the left and down
        rightLaser.setPosition(ship.x + shipWidth / 2 - 35, ship.y +10); // Position to the right edge of the ship
            rightLaser.setVelocityY(-laserSpeed);
            laserSound.play();
        }
    }
    }


    function hitAsteroid(laser, asteroid) {
      // Get the center position of the asteroid
      const asteroidCenterX = asteroid.x;
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
        })
        

        laser.destroy();
        asteroid.destroy();
        setScore(prev => prev + 100)    
      }
    }

    return () => {
      game.destroy(true); // Clean up the game instance on component unmount
    };
  }, []);

  return <div id="game-container" />;
};

export default Game;

