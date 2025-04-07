import {createContext} from 'react'
import verbs from '../data/verblist';

const data = {
    userName: {
        surname: "John",
        familyName: "Doe"
    },
    shield: 10,
    resources: [
        {
            id: 0,
            short: "GO",
            symbol: "Au",
            de: "Gold",
            ko: "금",
            imgPath: '',
            initialValue: 0,
            currentValue: 27,
            color: '#f4d66b',
            prepositions: ["gegen", "für"]
        },
        {
            id: 1,
            short: "AL",
            symbol: "Al",
            de: "Aluminium",
            ko: "알루미늄",
            imgPath: '',
            initialValue: 0,
            currentValue: 11,
            color: '#90be6d   ',
            prepositions: ["über", "mit", "bei"]
        },
        {
            id: 2,
            short: "TI",
            symbol: "Ti",
            de: "Titan",
            ko: "티타늄",
            imgPath: '',
            initialValue: 0,
            currentValue: 6,
            color: '#663300',
            prepositions: ["um", "aus", "an"]
        },
        {
            id: 7,
            short: "EI",
            de: "Eisen",
            symbol: "Fe",
            ko: "철",
            imgPath: '',
            initialValue: 0,
            currentValue: 0,
            color: '#277da1',
            prepositions: ["zu", "nach", "auf"]

        }, {
            id: 12,
            short: "KU",
            de: "Plastik",
            symbol: "C2H4",
            ko: "플라스틱",
            imgPath: '',
            initialValue: 0,
            currentValue: 3,
            color: '#FE0000',
            prepositions: ["von", "vor", "in"]

        },
    ],
    verbs: verbs,
    score: 2000,
    currentVerb: {},
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
