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
    scene.load.image('starbaseLaser', 'img/starbase_laser.svg')
    scene.load.spritesheet('explosion', 'img/explosion.png', {
        frameWidth: 64,
        frameHeight: 64
    });
    scene.load.spritesheet('shipExplosion', 'img/explosion_ship.png', {
        frameWidth: 64,
        frameHeight: 64
    });
    scene.load.image('workshop', 'img/workshop.png')

    // powerups
    scene.load.image('gold', 'img/powerups/gold.png')
    scene.load.image('lithium', 'img/powerups/lithium.png')
    scene.load.image('plasma', 'img/powerups/plasma.png')
    scene.load.image('titanium', 'img/powerups/titanium.png')
    scene.load.image('iron', 'img/powerups/iron.png')
    scene.load.image('shield', 'img/powerups/shield.png')

    // starbase
    scene.load.image('starbase', 'img/starbase.svg')

    // AUDIO
    scene.load.audio('explosionSound', 'audio/explosion.mp3');
    scene.load.audio('laserSound', 'audio/laser.mp3');
    scene.load.audio('bgMusic', 'audio/horizon_of_the_unknown.mp3'); // Load the new sound
    scene.load.audio('hitSound', 'audio/hit.wav')
    scene.load.audio('powerupSound', 'audio/powerup.wav')
    scene.load.audio('gameoverSound', 'audio/8bit_synth_defeat.wav')
    scene.load.audio('hopeLossSound', 'audio/hope_loss.mp3')
    scene.load.audio('shipExplosionSound', 'audio/shipExplosion.wav')
    scene.load.audio('consoleClick', 'audio/console_click.wav')
    scene.load.audio('beepSound', 'audio/beep.wav')
    scene.load.audio('levelUpSound', 'audio/level_up.wav')
    scene.load.audio('pickedRightPrepositionSound', 'audio/right_preposition.mp3')
    scene.load.audio('pickedWrongPrepositionSound', 'audio/wrong_preposition.mp3')
    scene.load.audio('starbaseApproachingSound', 'audio/starbase_approaching.mp3')


}
