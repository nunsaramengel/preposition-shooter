import {createContext} from 'react'
import verbs from '../data/verblist';
import RESOURCES from "../data/resources"

const VERBS = verbs

const data = {
    userName: "",
    shield: 10,
    resources: RESOURCES,
    verbs: VERBS,
    score: 2000,
    currentVerb: verbs[0],
    unusedVerbs: VERBS,
    usedVerbs: [],
    credits: 400,
    listeners: [],
    update: () => {},
    isGameOver: false,
    laserSpeedUpdate: 0,
    currentScene: {
        nameinput: true,
        mainmenu: false,
        shooter: false,
        starbase: false,
        gameover: false
    },
    level: 1,
    sceneConfig: {
        shieldMaximum: 10,
        prepositionSpeed: 200,
        prepositionOvalColor: 0x328e6e,
        prepositionTextStyle: {
            font: '20px Arial',
            fill: '#000000',
            align: 'center'
        },
        numberOfStars: 1000,
        shipVelocity: 600,
        laserScale: 0.19,
        asteroidsPerMilliseconds: 2000,
        asteroidSpeed: {
            min: 120,
            max: 220
        },
        laserSpeedAddends: 800
    }

};

const GameContext = createContext(data)

export {
    GameContext,
    data
}
