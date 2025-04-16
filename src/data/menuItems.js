import upgrades from "./upgrades";
const UPGRADES = upgrades

const menuItems = [
    {
        label: "플라스마빔",
        name: "plasmaBeam",
        icon: 'img/ringMenu/plasma_beam.png',
        key: "0",
        cost: UPGRADES[0].cost,
        acquired: false,
        affordable: false,
        description: `레이저 강화 업그레이드`
    },
    {
        label: "파워업플러스",
        name: "powerupPlus",
        icon: 'img/powerups/powerup_plus.png',
        key: "1",
        cost: UPGRADES[1].cost,
        acquired: false,
        affordable: false,
        description: `파워업 획득량 증가`


    },
    {
        label: "플라스마쉴드",
        name: "plasmaShields",
        icon: 'img/ringMenu/shields.png',
        key: "2",
        cost: UPGRADES[2].cost,
        acquired: false,
        affordable: false,
        description: `함선 쉴드 강화`

    },
    {
        label: "터보엔진",
        name: "turbo",
        icon: 'img/ringMenu/turbo.png',
        key: "3",
        cost: UPGRADES[3].cost,
        acquired: false,
        affordable: false,
        description: `더 빨리 움직이기`
    }, {
        label: "Y레이저빔",
        name: "yLaser",
        icon: 'img/ringMenu/y_laser_v_2.png',
        key: "4",
        cost: UPGRADES[4].cost,
        acquired: false,
        affordable: false,
        description: "대각선 레이저 추가"

    },
]

export default menuItems;
