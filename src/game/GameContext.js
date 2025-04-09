import {createContext} from 'react'
import verbs from '../data/verblist';
import RESOURCES from "../data/resources"

const data = {
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
    level: 1
};

const GameContext = createContext(data)

export {
    GameContext,
    data
}
