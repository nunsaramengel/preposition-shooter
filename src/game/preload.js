export function preloadAssets(scene) {
    // Load assets here
    // IMAGES
    scene.load.image('ship', 'img/ship.png');
    scene.load.image('laser', 'img/laser.png');
    scene.load.image('plasmaLaser', 'img/laserBeam.png')
    scene.load.image('asteroid', 'img/asteroid.png');
    scene.load.image('asteroid1', 'img/asteroid01.png');
    scene.load.image('asteroid2', 'img/asteroid02.png');
    scene.load.image('asteroid3', 'img/asteroid03.png');
    scene.load.image('asteroid4', 'img/asteroid04.png');
    scene.load.image('asteroid5', 'img/asteroid05.png');
    scene.load.image('starbaseLaser', 'img/starbase_laser.svg')
    scene.load.image('shipPixel', "img/ship_pixel.png")

    /'/animated sprites '
scene.load.spritesheet('explosion', 'img/explosion.png', {
        frameWidth: 64,
        frameHeight: 64
    });
    scene.load.spritesheet('shipExplosion', 'img/explosion_ship.png', {
        frameWidth: 64,
        frameHeight: 64
    });

    // scenes
    // workshop
    scene.load.image('workshop', 'img/workshop.png')
    // starbase
    scene.load.image('starbase3Doors', "img/starbase_3_doors.jpg")
    scene.load.image('madra', "img/madra.png")
    scene.load.image('dialogueBox', "img/dialogue.png")
    // computer room


    // powerups
    scene.load.image('gold', 'img/powerups/pixelated/gold.png')
    scene.load.image('lithium', 'img/powerups/pixelated/lithium.png')
    scene.load.image('plasma', 'img/powerups/pixelated/plasma.png')
    scene.load.image('titanium', 'img/powerups/pixelated/titanium.png')
    scene.load.image('iron', 'img/powerups/pixelated/iron.png')
    scene.load.image('shield', 'img/powerups/pixelated/shield.png')

    // new ship
    scene.load.image("shipP", "img/shipPix.png")


    // starbase
    scene.load.image('starbase', 'img/starbase.png')

    // earth
    scene.load.image('earth', 'img/earth.png')

    // keyboard keys
    scene.load.image('spaceBarKey', 'img/spaceBar.png')
    scene.load.image('arrow', 'img/arrow.png')
    scene.load.image('arrowL', 'img/arrowL.png')
    scene.load.image('arrowLM', "img/arrowLMagenta.png")
    scene.load.image('arrowRM', "img/arrowRMagenta.png")
    scene.load.image('spaceBarM', "img/spaceBarMagenta.png")
    scene.load.image('pointingArrowRightMagenta', "img/pointingArrowRightMagenta.png")
    scene.load.image('arrowBLM', "img/arrowBottomLeftMagenta.png")

    // RING MENU
    scene.load.image('plasmaBeam', 'img/ringMenu/plasmaBeam.png')
    scene.load.image('powerupPlus', "img/ringMenu/powerupPlus.png")
    scene.load.image('plasmaShields', "img/ringMenu/shields.png")
    scene.load.image('turbo', "img/ringMenu/turbo.png")
    scene.load.image('yLaser', "img/ringMenu/yLaser.png")
    scene.load.image('ringMenuBG', "img/ringMenu/ringMenuBG.png")
    scene.load.image('nebula', 'img/nebula.png')

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
    scene.load.audio('newMissionSound', 'audio/spell.wav')
    scene.load.audio('whip', 'audio/whip.mp3')
    scene.load.audio('woosh', "audio/woosh.wav")
    scene.load.audio('error', 'audio/error.mp3')
    scene.load.audio('ringMenuOpenCloseSound', "audio/ringMenuOpenClose.wav")


}
