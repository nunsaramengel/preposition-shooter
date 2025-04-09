import Preposition from "../classes/Preposition";

const prep = new Preposition();


export const RESOURCES = [
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
        prepositions: [prep.gegen, prep.fuer]
    },
    {
        id: 1,
        short: "Li",
        symbol: "Li",
        de: "Lithium",
        ko: "리튬",
        imgPath: '',
        initialValue: 0,
        currentValue: 11,
        color: '#EE77D2   ',
        prepositions: [prep.ueber, prep.mit, prep.bei]
    },
    {
        id: 2,
        short: "Pl",
        de: "Plasma",
        ko: "플라스마",
        imgPath: '',
        initialValue: 0,
        currentValue: 3,
        color: '#CC0C6C',
        prepositions: [prep.von, prep.vor, prep. in]
    },
    {
        id: 3,
        short: "TI",
        symbol: "Ti",
        de: "Titan",
        ko: "티타늄",
        imgPath: '',
        initialValue: 0,
        currentValue: 6,
        color: '#0C52B4',
        prepositions: [prep.um, prep.aus, prep.an]
    }, {
        id: 4,
        short: "EI",
        de: "Eisen",
        symbol: "Fe",
        ko: "철",
        imgPath: '',
        initialValue: 0,
        currentValue: 0,
        color: '#639BB3',
        prepositions: [prep.zu, prep.nach, prep.auf]

    },
]

export default RESOURCES
