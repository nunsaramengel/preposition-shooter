import {createContext} from 'react'
import verbs from '../data/verblist';
import RESOURCES from "../data/resources"
import menuItems from '../data/menuItems';
import sceneConfig from '../data/sceneConfig';

const SCENE_CONFIG = sceneConfig;

const VERBS = verbs


const data = {
    enoughCredits: false,
    POWERUP_SCALE: 4,
    isRingMenuOpen: false,
    selectedUpgrade: undefined,
    menuItems: menuItems,
    userName: "",
    shield: 10,
    resources: RESOURCES,
    verbs: VERBS,
    score: 2000,
    currentVerb: verbs[0],
    unusedVerbs: VERBS,
    usedVerbs: [],
    credits: 0,
    listeners: [],
    update: () => {},
    isGameOver: false,
    laserSpeedUpdate: 0,
    currentScene: "",
    level: 1,
    sceneConfig: SCENE_CONFIG,
    resourceMap: {
        'gold': {
            key: 'resources',
            id: 0,
            amount: 9
        }, // Gold
        'lithium': {
            key: 'resources',
            id: 1,
            amount: 7
        }, // Aluminium
        'plasma': {
            key: 'resources',
            id: 2,
            amount: 4
        }, // Plastik
        'titanium': {
            key: 'resources',
            id: 3,
            amount: 8
        }, // Titan
        'iron': {
            key: 'resources',
            id: 4,
            amount: 6
        }, // Eisen
        'shield': {
            key: 'shield',
            id: 5,
            amount: 4
        }, // Shield
    }

};

const GameContext = createContext(data)

export {
    GameContext,
    data
}
