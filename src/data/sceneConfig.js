const sceneConfig = {
    shieldMaximum: 10,
    prepositionSpeed: 200,
    prepositionOvalColor: 0x328e6e,
    prepositionTextStyle: {
        font: '20px Arial',
        fill: '#000000',
        align: 'center'
    },
    numberOfStars: 1000,
    shipVelocity: 400,
    plasmaBeam: false,
    laserScale: 0.15,
    plasmaScale: 0.09,
    yLaser: false,
    shipScale: 0.12,
    plasmaShield: false,
    hitsToDestroyAsteroid: 2,
    asteroidsPerMilliseconds: 6000,
    prepositionScoreBonus: 200,
    prepositionScoreMalus: 400,
    asteroidSpeed: {
        min: 120,
        max: 200
    },
    asteroidDestroyBonus: {
        score: 50,
        credits: 50
    },
    laserSpeedAddends: 800
}

export default sceneConfig
