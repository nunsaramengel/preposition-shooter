export function preloadAssets(scene) {
    // Load assets here
    // IMAGES
    scene.load.image('ship', 'img/ship.png');
    scene.load.image('laser', 'img/laser.png');
    scene.load.image('asteroid', 'img/asteroid.png');
    scene.load.image('asteroid1', 'img/asteroid01.png');
    scene.load.image('asteroid2', 'img/asteroid02.png');
    scene.load.image('asteroid3', 'img/asteroid03.png');
    scene.load.image('asteroid4', 'img/asteroid04.png');
    scene.load.image('asteroid5', 'img/asteroid05.png');
    scene.load.spritesheet('explosion', 'img/explosion.png', {
        frameWidth: 64,
        frameHeight: 64
    });

    // AUDIO
    scene.load.audio('explosionSound', 'audio/explosion.mp3');
    scene.load.audio('laserSound', 'audio/laser.mp3');
    scene.load.audio('howlSound', 'audio/horizon_of_the_unknown.mp3'); // Load the new sound
}
