import verbs from "../data/verblist";
import RESOURCES from "../data/resources"

const VERBS = verbs

export const GameStore = {
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
    isGameOver: false,
    laserSpeedUpdate: 0,
    currentScene: {
        nameinput: true,
        mainmenu: false,
        shooter: false,
        starbase: false,
        gameover: false
    },
    update(data) {
        Object.assign(this, data);
        this.listeners.forEach((fn) => fn(this));
    },
    subscribe(fn) {
        this.listeners.push(fn);
        return() => {
            this.listeners = this.listeners.filter((listener) => listener !== fn)
        };
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

export default GameStore

// Alu, Titan, Stahl, Kunststoff, Gold
