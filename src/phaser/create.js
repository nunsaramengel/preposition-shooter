export default function create(NUMBER_OF_STARS, createStar, spawnAsteroid, shootLasers, hitAsteroid) {
    const stars = [];

    for (let i = 0; i < NUMBER_OF_STARS; i++) {
        const star = createStar.call(this);
        stars.push(star);
    }

    // Create the starship
    const ship = this.physics.add.image(400, 550, 'ship').setOrigin(0.5, 0.5);
    ship.setCollideWorldBounds(true);
    ship.setScale(0.4);
    ship.setDepth(1);

    // Create lasers group
    const lasers = this.physics.add.group({defaultKey: 'laser', maxSize: 100});

    // Create asteroids group
    const asteroids = this.physics.add.group();

    // Input events
    const cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown-SPACE', () => shootLasers.call(this, lasers, ship), this);

    // Spawn asteroids
    this.time.addEvent({
        delay: 1000,
        callback: () => spawnAsteroid.call(this, asteroids),
        callbackScope: this,
        loop: true
    });

    // Collision detection
    this.physics.add.overlap(lasers, asteroids, (laser, asteroid) => hitAsteroid.call(this, laser, asteroid), null, this);
}
