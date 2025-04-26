const upgrades = [
    {
        label: "플라스마빔",
        id: 0,
        name: "plasmaBeam",
        requiredLevel: 1,
        cost: {
            gold: 10,
            lithium: 4,
            plasma: 6,
            titanium: 5,
            iron: 5,
            credits: 60
        },
        acquired: false,
        affordable: false
    },
    {
        id: 1,
        label: "파워업플러스",
        name: "powerUpPlus",
        requiredLevel: 1,
        cost: {
            gold: 2,
            lithium: 5,
            plasma: 4,
            titanium: 10,
            iron: 5,
            credits: 10
        },
        acquired: false,
        affordable: false
    },
    {
        id: 2,
        label: "플라스마쉴드",
        name: "plasmaShields",
        requiredLevel: 1,
        cost: {
            gold: 5,
            lithium: 5,
            plasma: 5,
            titanium: 5,
            iron: 5,
            credits: 70
        },
        acquired: false,
        affordable: false
    },
    {
        id: 3,
        label: "터보엔진",
        name: "turbo",
        requiredLevel: 1,
        cost: {
            gold: 6,
            lithium: 10,
            plasma: 10,
            titanium: 1,
            iron: 10,
            credits: 50
        },
        acquired: false,
        affordable: false
    }, {
        id: 4,
        label: "Y레이저빔",
        name: "yLaser",
        requiredLevel: 1,
        cost: {
            gold: 10,
            lithium: 8,
            plasma: 2,
            titanium: 1,
            iron: 10,
            credits: 90
        },
        acquired: false,
        affordable: false
    },
]

/*
1 schneller fliegen,
2 breitere Laser,
3 schnellere Laser,
4 Seitliche Laser,
5 diagnolae Laser
5 stärkere Schilde,
6 regenerative Schilde
7 Rohstoffe besser verarbeiten(mehr durch PowerUps)
8 mehr PowerUps finden
9 PowerUp Magnet
10 Minen legen (희망 Loss reduce)
11 Turbo (X)
12 Turbo (y)
13 Telporter (rechts links teleportieren am Rand rechts rein, am Rand links raus u umgekehrt)
*/

export const resourceMap = {
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
};


export default upgrades;
