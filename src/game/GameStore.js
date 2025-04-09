import verbs from "../data/verblist";
import RESOURCES from "../data/resources"

export const GameStore = {
    userName: {
        surname: "John",
        familyName: "Doe"
    },
    shield: 10,
    resources: RESOURCES,
    verbs: verbs,
    score: 2000,
    currentVerb: verbs[104],
    matchedVerbs: [],
    unmatchedVerbs: [],
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
    level: 1
};

export default GameStore

// Alu, Titan, Stahl, Kunststoff, Gold
