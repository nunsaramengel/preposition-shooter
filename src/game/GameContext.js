import {createContext} from 'react'

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
    verbs: [
        {
            "verb": "abhängen",
            "preposition": "von",
            "case": "D",
            "english": "to depend upon"
        },
        {
            "verb": "achten",
            "preposition": "auf",
            "case": "A",
            "english": "to look after"
        },
        {
            "verb": "anfangen",
            "preposition": "mit",
            "case": "D",
            "english": "to begin with"
        },
        {
            "verb": "ankommen",
            "preposition": "auf",
            "case": "A",
            "english": "to depend upon"
        }, {
            "verb": "antworten",
            "preposition": "auf",
            "case": "A",
            "english": "to reply to"
        }, {
            "verb": "sich ärgern",
            "preposition": "über",
            "case": "A",
            "english": "to get upset about"
        }, {
            "verb": "aufhören",
            "preposition": "mit",
            "case": "D",
            "english": "to quit sth"
        }, {
            "verb": "aufpassen",
            "preposition": "auf",
            "case": "A",
            "english": "to look after"
        }, {
            "verb": "sich aufregen",
            "preposition": "über",
            "case": "A",
            "english": "to get upset about"
        }, {
            "verb": "ausgeben",
            "preposition": "für",
            "case": "A",
            "english": "to spend on"
        }, {
            "verb": "sich bedanken",
            "preposition": "bei",
            "case": "D",
            "english": "to thank sb."
        }, {
            "verb": "sich bedanken",
            "preposition": "für",
            "case": "A",
            "english": "to thank for"
        }, {
            "verb": "beginnen",
            "preposition": "mit",
            "case": "D",
            "english": "to begin"
        }, {
            "verb": "sich bemühen",
            "preposition": "um",
            "case": "A",
            "english": "to strive for"
        }, {
            "verb": "berichten",
            "preposition": "über",
            "case": "A",
            "english": "to report on"
        }, {
            "verb": "sich beschäftigen",
            "preposition": "mit",
            "case": "D",
            "english": "to busy oneself with"
        }, {
            "verb": "sich beschweren",
            "preposition": "bei",
            "case": "D",
            "english": "to complain to"
        }, {
            "verb": "bestehen",
            "preposition": "aus",
            "case": "D",
            "english": "to consist of"
        }, {
            "verb": "bestehen",
            "preposition": "auf",
            "case": "A",
            "english": "to insist upon"
        }, {
            "verb": "sich beteiligen",
            "preposition": "an",
            "case": "D",
            "english": "to involve oneself with"
        }, {
            "verb": "sich bewerben",
            "preposition": "bei",
            "case": "D",
            "english": "to apply at (workplace)"
        }, {
            "verb": "sich bewerben",
            "preposition": "um",
            "case": "A",
            "english": "to apply for (job)"
        }, {
            "verb": "sich beziehen",
            "preposition": "auf",
            "case": "A",
            "english": "to refer to"
        }, {
            "verb": "bitten",
            "preposition": "um",
            "case": "A",
            "english": "to ask for"
        }, {
            "verb": "danken",
            "preposition": "für",
            "case": "A",
            "english": "to thank for"
        }, {
            "verb": "denken",
            "preposition": "an",
            "case": "A",
            "english": "to think of"
        }, {
            "verb": "diskutieren",
            "preposition": "über",
            "case": "A",
            "english": "to discuss about"
        }, {
            "verb": "einladen",
            "preposition": "zu",
            "case": "D",
            "english": "to invite to"
        }, {
            "verb": "sich entscheiden",
            "preposition": "für",
            "case": "A",
            "english": "to opt for"
        }, {
            "verb": "sich entschließen",
            "preposition": "zu",
            "case": "D",
            "english": "to decide upon"
        }, {
            "verb": "sich entschuldigen",
            "preposition": "bei",
            "case": "D",
            "english": "to apologise to"
        }, {
            "verb": "sich entschuldigen",
            "preposition": "für",
            "case": "A",
            "english": "to apologise for"
        }, {
            "verb": "erfahren",
            "preposition": "von",
            "case": "D",
            "english": "to hear about"
        }, {
            "verb": "sich erholen",
            "preposition": "von",
            "case": "D",
            "english": "to recover from"
        }, {
            "verb": "sich erinnern",
            "preposition": "an",
            "case": "A",
            "english": "to remember"
        }, {
            "verb": "erkennen",
            "preposition": "an",
            "case": "D",
            "english": "to know by"
        }, {
            "verb": "sich erkundigen",
            "preposition": "nach",
            "case": "D",
            "english": "to enquire about"
        }, {
            "verb": "erschrecken",
            "preposition": "über",
            "case": "A",
            "english": "to be shocked by"
        }, {
            "verb": "erzählen",
            "preposition": "über",
            "case": "A",
            "english": "to recall about"
        }, {
            "verb": "erzählen",
            "preposition": "von",
            "case": "D",
            "english": "to tell of"
        }, {
            "verb": "fragen",
            "preposition": "nach",
            "case": "A",
            "english": "to ask about"
        }, {
            "verb": "sich freuen",
            "preposition": "über",
            "case": "A",
            "english": "to be glad about"
        }, {
            "verb": "sich freuen",
            "preposition": "auf",
            "case": "A",
            "english": "to look forward to"
        }, {
            "verb": "gehen",
            "preposition": "um",
            "case": "A",
            "english": "to be about"
        }, {
            "verb": "gehören",
            "preposition": "zu",
            "case": "D",
            "english": "to belong to"
        }, {
            "verb": "sich gewöhnen",
            "preposition": "an",
            "case": "A",
            "english": "to get used to"
        }, {
            "verb": "glauben",
            "preposition": "an",
            "case": "A",
            "english": "to believe in"
        }, {
            "verb": "gratulieren",
            "preposition": "zu",
            "case": "D",
            "english": "to congratulate on"
        }, {
            "verb": "halten",
            "preposition": "für",
            "case": "A",
            "english": "to reckon as"
        }, {
            "verb": "halten",
            "preposition": "von",
            "case": "D",
            "english": "to think about / consider"
        }, {
            "verb": "sich handeln",
            "preposition": "um",
            "case": "A",
            "english": "to involve"
        }, {
            "verb": "handeln",
            "preposition": "von",
            "case": "D",
            "english": "to deal with (book etc.)"
        }, {
            "verb": "helfen",
            "preposition": "bei",
            "case": "D",
            "english": "to help with"
        }, {
            "verb": "hindern",
            "preposition": "an",
            "case": "D",
            "english": "to impede from"
        }, {
            "verb": "hoffen",
            "preposition": "auf",
            "case": "A",
            "english": "to hope for"
        }, {
            "verb": "hören",
            "preposition": "von",
            "case": "D",
            "english": "to hear from"
        }, {
            "verb": "sich informieren",
            "preposition": "über",
            "case": "A",
            "english": "to learn about"
        }, {
            "verb": "sich interessen",
            "preposition": "für",
            "case": "A",
            "english": "to be interested in"
        }, {
            "verb": "klagen",
            "preposition": "über",
            "case": "A",
            "english": "to complain about"
        }, {
            "verb": "kämpfen",
            "preposition": "für",
            "case": "A",
            "english": "to fight for"
        }, {
            "verb": "kommen",
            "preposition": "zu",
            "case": "D",
            "english": "to come to / attend"
        }, {
            "verb": "sich konzentrieren",
            "preposition": "auf",
            "case": "A",
            "english": "to concentrate on"
        }, {
            "verb": "sich kümmern",
            "preposition": "um",
            "case": "A",
            "english": "to take care of (task, problem)"
        }, {
            "verb": "lachen",
            "preposition": "über",
            "case": "A",
            "english": "to laugh at (joke)"
        }, {
            "verb": "leiden",
            "preposition": "an",
            "case": "D",
            "english": "to suffer from"
        }, {
            "verb": "leiden",
            "preposition": "über",
            "case": "A",
            "english": "to suffer as a result of"
        }, {
            "verb": "nachdenken",
            "preposition": "über",
            "case": "A",
            "english": "to think something over"
        }, {
            "verb": "protestieren",
            "preposition": "gegen",
            "case": "A",
            "english": "to protest against"
        }, {
            "verb": "rechnen",
            "preposition": "mit",
            "case": "D",
            "english": "to expect / reckon on"
        }, {
            "verb": "reden",
            "preposition": "über",
            "case": "A",
            "english": "to talk about"
        }, {
            "verb": "reden",
            "preposition": "von",
            "case": "D",
            "english": "to talk of"
        }, {
            "verb": "riechen",
            "preposition": "nach",
            "case": "D",
            "english": "to smell like / of"
        }, {
            "verb": "sagen",
            "preposition": "über",
            "case": "A",
            "english": "to say about"
        }, {
            "verb": "sagen",
            "preposition": "zu",
            "case": "D",
            "english": "to think about / say about / judge"
        }, {
            "verb": "schicken",
            "preposition": "an",
            "case": "D",
            "english": "to send (sth.) to"
        }, {
            "verb": "schicken",
            "preposition": "zu",
            "case": "D",
            "english": "to send (sb.) to"
        }, {
            "verb": "schimpfen",
            "preposition": "über",
            "case": "A",
            "english": "to moan about"
        }, {
            "verb": "schmecken",
            "preposition": "nach",
            "case": "D",
            "english": "to taste like / of"
        }, {
            "verb": "schreiben",
            "preposition": "an",
            "case": "A",
            "english": "to write to"
        }, {
            "verb": "schützen",
            "preposition": "vor",
            "case": "D",
            "english": "to protect against"
        }, {
            "verb": "sein",
            "preposition": "für",
            "case": "A",
            "english": "to be for (sth.)"
        }, {
            "verb": "sein",
            "preposition": "gegen",
            "case": "A",
            "english": "to be against (sth.)"
        }, {
            "verb": "sorgen",
            "preposition": "für",
            "case": "A",
            "english": "to care / provide for"
        }, {
            "verb": "sprechen",
            "preposition": "mit",
            "case": "D",
            "english": "to speak with"
        }, {
            "verb": "sprechen",
            "preposition": "über",
            "case": "A",
            "english": "to speak about"
        }, {
            "verb": "sterben",
            "preposition": "an",
            "case": "D",
            "english": "to die of"
        }, {
            "verb": "streiten",
            "preposition": "mit",
            "case": "D",
            "english": "to argue with"
        }, {
            "verb": "streiten",
            "preposition": "über",
            "case": "A",
            "english": "to argue about"
        }, {
            "verb": "teilnehmen",
            "preposition": "an",
            "case": "D",
            "english": "to take part in"
        }, {
            "verb": "telefonieren",
            "preposition": "mit",
            "case": "D",
            "english": "to call (sb.)"
        }, {
            "verb": "sich treffen",
            "preposition": "mit",
            "case": "D",
            "english": "to meet with"
        }, {
            "verb": "sich treffen",
            "preposition": "zu",
            "case": "D",
            "english": "to meet at (summit, sports game)"
        }, {
            "verb": "überreden",
            "preposition": "zu",
            "case": "D",
            "english": "to persuade (sb.) to"
        }, {
            "verb": "sich unterhalten",
            "preposition": "mit",
            "case": "D",
            "english": "to converse with"
        }, {
            "verb": "sich unterhalten",
            "preposition": "über",
            "case": "A",
            "english": "to converse about"
        }, {
            "verb": "sich verabreden",
            "preposition": "mit",
            "case": "D",
            "english": "to arrange to meet with (sb.)"
        }, {
            "verb": "sich verabschieden",
            "preposition": "von",
            "case": "D",
            "english": "to say goodbye to"
        }, {
            "verb": "vergleichen",
            "preposition": "mit",
            "case": "D",
            "english": "to compare with"
        }, {
            "verb": "sich verlassen",
            "preposition": "auf",
            "case": "A",
            "english": "to rely on (sb. / sth.)"
        }, {
            "verb": "sich verlieben",
            "preposition": "in",
            "case": "A",
            "english": "to fall in love with"
        }, {
            "verb": "sich verstehen",
            "preposition": "mit",
            "case": "D",
            "english": "to get along with (sb.)"
        }, {
            "verb": "verstehen",
            "preposition": "von",
            "case": "D",
            "english": "to know about"
        }, {
            "verb": "sich vorbereiten",
            "preposition": "auf",
            "case": "A",
            "english": "to prepare oneself for"
        }, {
            "verb": "warnen",
            "preposition": "vor",
            "case": "D",
            "english": "to warn about"
        }, {
            "verb": "warten",
            "preposition": "auf",
            "case": "A",
            "english": "to wait for"
        }, {
            "verb": "sich wenden",
            "preposition": "an",
            "case": "A",
            "english": "to turn / refer to"
        }, {
            "verb": "werden",
            "preposition": "zu",
            "case": "D",
            "english": "to turn into"
        }, {
            "verb": "wissen",
            "preposition": "von",
            "case": "D",
            "english": "to know about sth"
        }, {
            "verb": "sich wundern",
            "preposition": "über",
            "case": "A",
            "english": "to wonder about"
        }, {
            "verb": "zuschauen",
            "preposition": "bei",
            "case": "D",
            "english": "to spectate at"
        }, {
            "verb": "zusehen",
            "preposition": "bei",
            "case": "D",
            "english": "to watch(while doing sth.)"
        }, {
            "verb": "zweifeln",
            "preposition": "an",
            "case": "A",
            "english": "to doubt about"
        }
    ],
    score: 2000,
    currentVerb: {},
    matchedVerbs: [],
    unmatchedVerbs: [],
    credits: 400,
    listeners: [],
    update: () => {},
    isGameOver: false,
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
