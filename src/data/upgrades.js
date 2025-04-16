const upgrades = [
    {
        id: 0,
        name: "plasmaBeam",
        label: "플라스마빔",
        requiredLevel: 1,
        cost: {
            gold: 100,
            lithium: 40,
            plasma: 160,
            titanium: 55,
            iron: 35,
            credits: 6000,
        },
        acquired: false,
    },
    {
        id: 1,
        name: "powerUpPlus",
        label: "파워업플러스",
        requiredLevel: 1,
        cost: {
            gold: 200,
            lithium: 50,
            plasma: 40,
            titanium: 100,
            iron: 85,
            credits: 10000,
        },
        acquired: false,
    },
    {
        id: 2,
        name: "plasmaShields",
        label: "플라스마쉴드",
        requiredLevel: 1,
        cost: {
            gold: 45,
            lithium: 25,
            plasma: 150,
            titanium: 15,
            iron: 5,
            credits: 7000
        },
        acquired: false,
    },
    {
        id: 3,
        name: "turbo",
        label: "터보엔진",
        requiredLevel: 1,
        cost: {
            gold: 65,
            lithium: 150,
            plasma: 30,
            titanium: 95,
            iron: 90,
            credits: 4500,
        },
        acquired: false,
    },
    {
        id: 4,
        name: "yLaser",
        label: "Y레이저빔",
        requiredLevel: 1,
        cost: {
            gold: 130,
            lithium: 80,
            plasma: 200,
            titanium: 150,
            iron: 140,
            credits: 9000,
        },
        acquired: false,
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
export default upgrades;
