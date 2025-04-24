import verbs from "../data/verblist";
import RESOURCES from "../data/resources"
import menuItems from "../data/menuItems";
import sceneConfig from "../data/sceneConfig";

const VERBS = verbs
const SCENE_CONFIG = sceneConfig;

export const GameStore = {
    enoughCredits: false,
    POWERUP_SCALE: 4,
    isRingMenuOpen: false,
    selectedUpgrade: undefined,
    shipScale: 0.12,
    menuItems: menuItems.map(item => ({
        ...item,
        affordable: false
    })), // Initial alle auf false setzen
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
    isGameOver: false,
    laserSpeedUpdate: 0,
    currentScene: "",
    update(data) {
        Object.assign(this, data);
        this.updateAffordability(); // Nach jeder Änderung die Affordability neu berechnen
        this.listeners.forEach((fn) => fn(this));
    },
    subscribe(fn) {
        this.listeners.push(fn);
        return() => {
            this.listeners = this.listeners.filter((listener) => listener !== fn)
        };
    },
    level: 1,
    sceneConfig: SCENE_CONFIG,
    canAfford(cost) {
        if (!cost) 
            return true;
    
        let canAffordResources = true;
        for (const resource of this.resources) {
            const requiredAmount = cost[resource.key];
                if (requiredAmount && resource.currentValue<requiredAmount) {
                canAffordResources = false;
                break;
             }
         }
    const canAffordCredits = cost.credits === undefined || this.credits>= cost.credits;
            return canAffordResources && canAffordCredits;
    },
    updateAffordability() {
        this.menuItems = this.menuItems.map(item => ({
            ...item,
            affordable: this.canAfford(item.cost)
        }))
    },
    powerupPlusBonus: {
        gold: 0,
        lithium: 0,
        plasma: 0,
        titanium: 0,
        iron: 0,
        shield: 0
    },
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
    },
};

    export default GameStore

    // Alu, Titan, Stahl, Kunststoff, Gold
