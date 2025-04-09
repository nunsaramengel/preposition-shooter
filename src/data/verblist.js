import Preposition from "../classes/Preposition";

const prep = new Preposition();

const verbs = [
    {
        id: 0,
        verb: "abhängen",
        rightPreposition: prep.von,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "에 달려있다",
        level: 3,
        example: "Das Wetter hängt vom Regen ab."
    },
    {
        id: 1,
        verb: "achten",
        rightPreposition: prep.auf,
        wrongPreposition: prep.an,
        case: "A",
        ko: "돌보다",
        level: 2,
        example: "Du musst auf deine Gesundheit achten."
    },
    {
        id: 2,
        verb: "anfangen",
        rightPreposition: prep.mit,
        wrongPreposition: prep.auf,
        case: "D",
        ko: "…으로 시작하다",
        level: 1,
        example: "Wir fangen mit dem Essen an."
    },
    {
        id: 3,
        verb: "ankommen",
        rightPreposition: prep.auf,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "…에 달려있다",
        level: 4,
        example: "Es kommt auf deine Mitarbeit an."
    }, {
        id: 4,
        verb: "antworten",
        rightPreposition: prep.auf,
        wrongPreposition: prep.von,
        case: "A",
        ko: "…에 답장하다",
        level: 2,
        example: "Bitte antworte auf meine Frage."
    }, {
        id: 5,
        verb: "sich ärgern",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.fuer,
        case: "A",
        ko: "…에 대해 화내다",
        level: 3,
        example: "Er ärgert sich über den Lärm."
    }, {
        id: 6,
        verb: "aufhören",
        rightPreposition: prep.mit,
        wrongPreposition: prep.gegen,
        case: "D",
        ko: "…을 그만두다",
        level: 1,
        example: "Hör bitte mit dem Rauchen auf!"
    }, {
        id: 7,
        verb: "aufpassen",
        rightPreposition: prep.auf,
        wrongPreposition: prep.vor,
        case: "A",
        ko: "돌보다",
        level: 2,
        example: "Kannst du auf das Kind aufpassen?"
    }, {
        id: 8,
        verb: "sich aufregen",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.an,
        case: "A",
        ko: "…에 대해 흥분하다",
        level: 3,
        example: "Sie regt sich über die Ungerechtigkeit auf."
    }, {
        id: 9,
        verb: "ausgeben",
        rightPreposition: prep.fuer,
        wrongPreposition: prep.aus,
        case: "A",
        ko: "…에 쓰다",
        level: 2,
        example: "Er gibt viel Geld für Bücher aus."
    }, {
        id: 10,
        verb: "sich bedanken",
        rightPreposition: prep.bei,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~에게 감사하다",
        level: 1,
        example: "Ich möchte mich bei dir bedanken."
    }, {
        id: 11,
        verb: "sich bedanken",
        rightPreposition: prep.fuer,
        wrongPreposition: prep.an,
        case: "A",
        ko: "~에 대해 감사하다",
        level: 2,
        example: "Wir bedanken uns für Ihre Hilfe."
    }, {
        id: 12,
        verb: "beginnen",
        rightPreposition: prep.mit,
        wrongPreposition: prep.auf,
        case: "D",
        ko: "시작하다",
        level: 1,
        example: "Der Kurs beginnt mit einer Einführung."
    }, {
        id: 13,
        verb: "sich bemühen",
        rightPreposition: prep.um,
        wrongPreposition: prep.gegen,
        case: "A",
        ko: "~을 위해 노력하다",
        level: 3,
        example: "Er bemüht sich um eine neue Stelle."
    }, {
        id: 14,
        verb: "berichten",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.vor,
        case: "A",
        ko: "~에 대해 보도하다",
        level: 2,
        example: "Die Zeitung berichtet über das Ereignis."
    }, {
        id: 15,
        verb: "sich beschäftigen",
        rightPreposition: prep.mit,
        wrongPreposition: prep.bei,
        case: "D",
        ko: "~에 몰두하다",
        level: 3,
        example: "Sie beschäftigt sich mit einem interessanten Projekt."
    }, {
        id: 16,
        verb: "sich beschweren",
        rightPreposition: prep.bei,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~에게 불평하다",
        level: 2,
        example: "Der Gast beschwert sich beim Kellner."
    }, {
        id: 17,
        verb: "bestehen",
        rightPreposition: prep.aus,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~으로 이루어져 있다",
        level: 3,
        example: "Der Kuchen besteht aus Mehl, Zucker und Eiern."
    }, {
        id: 18,
        verb: "bestehen",
        rightPreposition: prep.auf,
        wrongPreposition: prep.gegen,
        case: "A",
        ko: "~을 주장하다",
        level: 4,
        example: "Er besteht auf seinem Recht."
    }, {
        id: 19,
        verb: "sich beteiligen",
        rightPreposition: prep.an,
        wrongPreposition: prep.vor,
        case: "D",
        ko: "~에 참여하다",
        level: 3,
        example: "Viele Menschen beteiligen sich an der Demonstration."
    }, {
        id: 20,
        verb: "sich bewerben",
        rightPreposition: prep.bei,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "(직장) ~에 지원하다",
        level: 2,
        example: "Sie bewirbt sich bei einer großen Firma."
    }, {
        id: 21,
        verb: "sich bewerben",
        rightPreposition: prep.um,
        wrongPreposition: prep.an,
        case: "A",
        ko: "(일) ~에 지원하다",
        level: 3,
        example: "Er bewirbt sich um die freie Stelle."
    }, {
        id: 22,
        verb: "sich beziehen",
        rightPreposition: prep.auf,
        wrongPreposition: prep.gegen,
        case: "A",
        ko: "~을 언급하다",
        level: 3,
        example: "Ich beziehe mich auf unser gestriges Gespräch."
    }, {
        id: 23,
        verb: "bitten",
        rightPreposition: prep.um,
        wrongPreposition: prep.vor,
        case: "A",
        ko: "~을 요청하다",
        level: 1,
        example: "Ich bitte dich um deine Hilfe."
    }, {
        id: 24,
        verb: "danken",
        rightPreposition: prep.fuer,
        wrongPreposition: prep.aus,
        case: "A",
        ko: "~에 대해 감사하다",
        level: 2,
        example: "Wir danken Ihnen für Ihre Aufmerksamkeit."
    }, {
        id: 25,
        verb: "denken",
        rightPreposition: prep.an,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "~을 생각하다",
        level: 2,
        example: "Ich denke oft an meine Familie."
    }, {
        id: 26,
        verb: "diskutieren",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.mit,
        case: "A",
        ko: "~에 대해 토론하다",
        level: 2,
        example: "Sie diskutieren über das neue Gesetz."
    }, {
        id: 27,
        verb: "einladen",
        rightPreposition: prep.zu,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~에 초대하다",
        level: 1,
        example: "Wir laden dich zu unserer Party ein."
    }, {
        id: 28,
        verb: "sich entscheiden",
        rightPreposition: prep.fuer,
        wrongPreposition: prep.gegen,
        case: "A",
        ko: "~을 선택하다",
        level: 3,
        example: "Er hat sich für das blaue Auto entschieden."
    }, {
        id: 29,
        verb: "sich entschließen",
        rightPreposition: prep.zu,
        wrongPreposition: prep.vor,
        case: "D",
        ko: "~하기로 결심하다",
        level: 3,
        example: "Sie entschloss sich zu einer Reise nach Italien."
    }, {
        id: 30,
        verb: "sich entschuldigen",
        rightPreposition: prep.bei,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~에게 사과하다",
        level: 1,
        example: "Er entschuldigt sich bei seinem Chef."
    }, {
        id: 31,
        verb: "sich entschuldigen",
        rightPreposition: prep.fuer,
        wrongPreposition: prep.an,
        case: "A",
        ko: "~에 대해 사과하다",
        level: 2,
        example: "Sie entschuldigt sich für ihr Verhalten."
    }, {
        id: 32,
        verb: "erfahren",
        rightPreposition: prep.von,
        wrongPreposition: prep.aus,
        case: "D",
        ko: "~에 대해 듣다",
        level: 2,
        example: "Ich habe von dem Unfall erfahren."
    }, {
        id: 33,
        verb: "sich erholen",
        rightPreposition: prep.von,
        wrongPreposition: prep.bei,
        case: "D",
        ko: "~로부터 회복하다",
        level: 3,
        example: "Er erholt sich von der Operation."
    }, {
        id: 34,
        verb: "sich erinnern",
        rightPreposition: prep.an,
        wrongPreposition: prep.mit,
        case: "A",
        ko: "~을 기억하다",
        level: 1,
        example: "Ich erinnere mich gut an unseren Urlaub."
    }, {
        id: 35,
        verb: "erkennen",
        rightPreposition: prep.an,
        wrongPreposition: prep.auf,
        case: "D",
        ko: "~으로 알다",
        level: 3,
        example: "Man erkennt ihn an seiner Stimme."
    }, {
        id: 36,
        verb: "sich erkundigen",
        rightPreposition: prep.nach,
        wrongPreposition: prep.bei,
        case: "D",
        ko: "~에 대해 문의하다",
        level: 2,
        example: "Sie erkundigt sich nach dem Weg."
    }, {
        id: 37,
        verb: "erschrecken",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.vor,
        case: "A",
        ko: "~에 놀라다",
        level: 4,
        example: "Er erschrickt über das laute Geräusch."
    }, {
        id: 38,
        verb: "erzählen",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.an,
        case: "A",
        ko: "~에 대해 이야기하다",
        level: 2,
        example: "Sie erzählt über ihre Reise."
    }, {
        id: 39,
        verb: "erzählen",
        rightPreposition: prep.von,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~에 대해 이야기하다",
        level: 2,
        example: "Er erzählt von seinen Problemen."
    }, {
        id: 40,
        verb: "fragen",
        rightPreposition: prep.nach,
        wrongPreposition: prep.aus,
        case: "A",
        ko: "~에 대해 묻다",
        level: 1,
        example: "Der Tourist fragt nach dem Museum."
    }, {
        id: 41,
        verb: "sich freuen",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "~에 대해 기뻐하다",
        level: 2,
        example: "Sie freut sich über das Geschenk."
    }, {
        id: 42,
        verb: "sich freuen",
        rightPreposition: prep.auf,
        wrongPreposition: prep.mit,
        case: "A",
        ko: "~을 기대하다",
        level: 3,
        example: "Wir freuen uns auf das Wochenende."
    }, {
        id: 43,
        verb: "gehen",
        rightPreposition: prep.um,
        wrongPreposition: prep.an,
        case: "A",
        ko: "~에 관한 것이다",
        level: 2,
        example: "Es geht um eine wichtige Entscheidung."
    }, {
        id: 44,
        verb: "gehören",
        rightPreposition: prep.zu,
        wrongPreposition: prep.aus,
        case: "D",
        ko: "~에 속하다",
        level: 1,
        example: "Das Buch gehört mir."
    }, {
        id: 45,
        verb: "sich gewöhnen",
        rightPreposition: prep.an,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "~에 익숙해지다",
        level: 3,
        example: "Ich gewöhne mich langsam an das neue Klima."
    }, {
        id: 46,
        verb: "glauben",
        rightPreposition: prep.an,
        wrongPreposition: prep.mit,
        case: "A",
        ko: "~을 믿다",
        level: 2,
        example: "Sie glaubt an eine bessere Zukunft."
    }, {
        id: 47,
        verb: "gratulieren",
        rightPreposition: prep.zu,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~에게 축하하다",
        level: 2,
        example: "Wir gratulieren dir zum Geburtstag."
    }, {
        id: 48,
        verb: "halten",
        rightPreposition: prep.fuer,
        wrongPreposition: prep.aus,
        case: "A",
        ko: "~으로 여기다",
        level: 3,
        example: "Ich halte das für keine gute Idee."
    }, {
        id: 49,
        verb: "halten",
        rightPreposition: prep.von,
        wrongPreposition: prep.bei,
        case: "D",
        ko: "~에 대해 생각하다 / 고려하다",
        level: 3,
        example: "Was hältst du von dem neuen Film?"
    }, {
        id: 50,
        verb: "sich handeln",
        rightPreposition: prep.um,
        wrongPreposition: prep.gegen,
        case: "A",
        ko: "~에 관한 것이다",
        level: 3,
        example: "Die Geschichte handelt sich um einen mutigen Helden."
    }, {
        id: 51,
        verb: "handeln",
        rightPreposition: prep.von,
        wrongPreposition: prep.vor,
        case: "D",
        ko: "(책 등) ~에 관한 것이다",
        level: 3,
        example: "Das Buch handelt von einem fernen Planeten."
    }, {
        id: 52,
        verb: "helfen",
        rightPreposition: prep.bei,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~을 돕다",
        level: 1,
        example: "Kannst du mir bitte beim Umzug helfen?"
    }, {
        id: 53,
        verb: "hindern",
        rightPreposition: prep.an,
        wrongPreposition: prep.auf,
        case: "D",
        ko: "~하는 것을 막다",
        level: 4,
        example: "Das schlechte Wetter hindert uns am Ausflug."
    }, {
        id: 54,
        verb: "hoffen",
        rightPreposition: prep.auf,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "~을 바라다",
        level: 2,
        example: "Wir hoffen auf besseres Wetter."
    }, {
        id: 55,
        verb: "hören",
        rightPreposition: prep.von,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~로부터 소식을 듣다",
        level: 2,
        example: "Hast du schon von dem neuen Restaurant gehört?"
    }, {
        id: 56,
        verb: "sich informieren",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.an,
        case: "A",
        ko: "~에 대해 알아보다",
        level: 2,
        example: "Ich möchte mich über die Zugverbindungen informieren."
    }, {
        id: 57,
        verb: "sich interessen",
        rightPreposition: prep.fuer,
        wrongPreposition: prep.gegen,
        case: "A",
        ko: "~에 관심 있다",
        level: 2,
        example: "Er interessiert sich sehr für Geschichte."
    }, {
        id: 58,
        verb: "klagen",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.vor,
        case: "A",
        ko: "~에 대해 불평하다",
        level: 3,
        example: "Die Nachbarn klagen über den Lärm."
    }, {
        id: 59,
        verb: "kämpfen",
        rightPreposition: prep.fuer,
        wrongPreposition: prep.aus,
        case: "A",
        ko: "~을 위해 싸우다",
        level: 3,
        example: "Viele Menschen kämpfen für ihre Rechte."
    }, {
        id: 60,
        verb: "kommen",
        rightPreposition: prep.zu,
        wrongPreposition: prep.bei,
        case: "D",
        ko: "~에 오다 / 참석하다",
        level: 1,
        example: "Er kommt erst spät zum Meeting."
    }, {
        id: 61,
        verb: "sich konzentrieren",
        rightPreposition: prep.auf,
        wrongPreposition: prep.mit,
        case: "A",
        ko: "~에 집중하다",
        level: 3,
        example: "Du musst dich auf deine Arbeit konzentrieren."
    }, {
        id: 62,
        verb: "sich kümmern",
        rightPreposition: prep.um,
        wrongPreposition: prep.an,
        case: "A",
        ko: "(일, 문제) ~을 돌보다",
        level: 2,
        example: "Sie kümmert sich um ihre kranke Mutter."
    }, {
        id: 63,
        verb: "lachen",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.gegen,
        case: "A",
        ko: "(농담) ~을 비웃다",
        level: 2,
        example: "Wir haben über seinen Witz gelacht."
    }, {
        id: 64,
        verb: "leiden",
        rightPreposition: prep.an,
        wrongPreposition: prep.vor,
        case: "D",
        ko: "~으로 고통받다",
        level: 3,
        example: "Er leidet an einer schweren Krankheit."
    }, {
        id: 65,
        verb: "leiden",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.aus,
        case: "A",
        ko: "~의 결과로 고통받다",
        level: 4,
        example: "Die Firma leidet über den Verlust."
    }, {
        id: 66,
        verb: "nachdenken",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "~에 대해 생각하다",
        level: 3,
        example: "Ich muss über dein Angebot nachdenken."
    }, {
        id: 67,
        verb: "protestieren",
        rightPreposition: prep.gegen,
        wrongPreposition: prep.mit,
        case: "A",
        ko: "~에 항의하다",
        level: 4,
        example: "Die Bürger protestieren gegen die neuen Baupläne."
    }, {
        id: 68,
        verb: "rechnen",
        rightPreposition: prep.mit,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~을 예상하다 / 기대하다",
        level: 3,
        example: "Wir rechnen mit deiner Hilfe."
    }, {
        id: 69,
        verb: "reden",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.gegen,
        case: "A",
        ko: "~에 대해 이야기하다",
        level: 2,
        example: "Sie reden über das neue Projekt."
    }, {
        id: 70,
        verb: "reden",
        rightPreposition: prep.von,
        wrongPreposition: prep.vor,
        case: "D",
        ko: "~에 대해 이야기하다",
        level: 2,
        example: "Er redet oft von seiner Heimat."
    }, {
        id: 71,
        verb: "riechen",
        rightPreposition: prep.nach,
        wrongPreposition: prep.aus,
        case: "D",
        ko: "~와 같은 냄새가 나다",
        level: 2,
        example: "Es riecht nach frischem Kaffee."
    }, {
        id: 72,
        verb: "sagen",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "~에 대해 말하다",
        level: 2,
        example: "Was hast du über mich gesagt?"
    }, {
        id: 73,
        verb: "sagen",
        rightPreposition: prep.zu,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~에 대해 생각하다 / 말하다 / 판단하다",
        level: 3,
        example: "Was sagst du zu dieser Idee?"
    }, {
        id: 74,
        verb: "schicken",
        rightPreposition: prep.an,
        wrongPreposition: prep.auf,
        case: "D",
        ko: "~에게 (물건을) 보내다",
        level: 1,
        example: "Ich schicke dir das Paket morgen."
    }, {
        id: 75,
        verb: "schicken",
        rightPreposition: prep.zu,
        wrongPreposition: prep.bei,
        case: "D",
        ko: "~에게 (사람을) 보내다",
        level: 1,
        example: "Der Arzt schickt den Patienten zu einem Spezialisten."
    }, {
        id: 76,
        verb: "schimpfen",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.mit,
        case: "A",
        ko: "~에 대해 불평하다",
        level: 3,
        example: "Die Mutter schimpft über das unordentliche Zimmer."
    }, {
        id: 77,
        verb: "schmecken",
        rightPreposition: prep.nach,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~와 같은 맛이 나다",
        level: 2,
        example: "Der Kuchen schmeckt nach Zitrone."
    }, {
        id: 78,
        verb: "schreiben",
        rightPreposition: prep.an,
        wrongPreposition: prep.gegen,
        case: "A",
        ko: "~에게 편지를 쓰다",
        level: 1,
        example: "Ich schreibe einen Brief an meine Freundin."
    }, {
        id: 79,
        verb: "schützen",
        rightPreposition: prep.vor,
        wrongPreposition: prep.aus,
        case: "D",
        ko: "~로부터 보호하다",
        level: 2,
        example: "Die Creme schützt vor der Sonne."
    }, {
        id: 80,
        verb: "sein",
        rightPreposition: prep.fuer,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "~에 찬성하다",
        level: 1,
        example: "Ich bin für diese Entscheidung."
    }, {
        id: 81,
        verb: "sein",
        rightPreposition: prep.gegen,
        wrongPreposition: prep.mit,
        case: "A",
        ko: "~에 반대하다",
        level: 2,
        example: "Viele Leute sind gegen die neue Steuer."
    }, {
        id: 82,
        verb: "sorgen",
        rightPreposition: prep.fuer,
        wrongPreposition: prep.an,
        case: "A",
        ko: "~을 돌보다 / 책임지다",
        level: 2,
        example: "Er sorgt für seine Familie."
    }, {
        id: 83,
        verb: "sprechen",
        rightPreposition: prep.mit,
        wrongPreposition: prep.auf,
        case: "D",
        ko: "~와 이야기하다",
        level: 1,
        example: "Ich spreche gerade mit meinem Kollegen."
    }, {
        id: 84,
        verb: "sprechen",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "~에 대해 이야기하다",
        level: 2,
        example: "Wir sprechen über das neue Buch."
    }, {
        id: 85,
        verb: "sterben",
        rightPreposition: prep.an,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~으로 죽다",
        level: 3,
        example: "Er ist an einer schweren Krankheit gestorben."
    }, {
        id: 86,
        verb: "streiten",
        rightPreposition: prep.mit,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~와 싸우다",
        level: 2,
        example: "Die Kinder streiten mit ihren Eltern."
    }, {
        id: 87,
        verb: "streiten",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.vor,
        case: "A",
        ko: "~에 대해 싸우다",
        level: 3,
        example: "Sie streiten über das Fernsehprogramm."
    }, {
        id: 88,
        verb: "teilnehmen",
        rightPreposition: prep.an,
        wrongPreposition: prep.bei,
        case: "D",
        ko: "~에 참가하다",
        level: 2,
        example: "Viele Leute nehmen an dem Kurs teil."
    }, {
        id: 89,
        verb: "telefonieren",
        rightPreposition: prep.mit,
        wrongPreposition: prep.auf,
        case: "D",
        ko: "~에게 전화하다",
        level: 1,
        example: "Ich telefoniere gerade mit meiner Mutter."
    }, {
        id: 90,
        verb: "sich treffen",
        rightPreposition: prep.mit,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~와 만나다",
        level: 1,
        example: "Ich treffe mich heute Abend mit Freunden."
    }, {
        id: 91,
        verb: "sich treffen",
        rightPreposition: prep.zu,
        wrongPreposition: prep.bei,
        case: "D",
        ko: "(정상회담, 스포츠 경기) ~에서 만나다",
        level: 2,
        example: "Die beiden Politiker treffen sich zu einem Gespräch."
    }, {
        id: 92,
        verb: "überreden",
        rightPreposition: prep.zu,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~을 설득하여 ~하게 하다",
        level: 3,
        example: "Er hat mich dazu überredet, mitzukommen."
    }, {
        id: 93,
        verb: "sich unterhalten",
        rightPreposition: prep.mit,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~와 대화하다",
        level: 2,
        example: "Wir unterhalten uns gerade mit den Nachbarn."
    }, {
        id: 94,
        verb: "sich unterhalten",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "~에 대해 대화하다",
        level: 3,
        example: "Sie unterhalten sich über ihre Arbeit."
    }, {
        id: 95,
        verb: "sich verabreden",
        rightPreposition: prep.mit,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~와 만날 약속을 하다",
        level: 2,
        example: "Ich habe mich mit ihr für morgen verabredet."
    }, {
        id: 96,
        verb: "sich verabschieden",
        rightPreposition: prep.von,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~에게 작별 인사를 하다",
        level: 1,
        example: "Wir verabschieden uns von unseren Gästen."
    }, {
        id: 97,
        verb: "vergleichen",
        rightPreposition: prep.mit,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~와 비교하다",
        level: 3,
        example: "Man kann Äpfel nicht mit Birnen vergleichen."
    }, {
        id: 98,
        verb: "sich verlassen",
        rightPreposition: prep.auf,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "(사람/사물) ~을 믿다 / 의지하다",
        level: 2,
        example: "Du kannst dich auf mich verlassen."
    }, {
        id: 99,
        verb: "sich verlieben",
        rightPreposition: prep. in,
        wrongPreposition: prep.an,
        case: "A",
        ko: "~와 사랑에 빠지다",
        level: 2,
        example: "Er hat sich in ihre Augen verliebt."
    }, {
        id: 100,
        verb: "sich verstehen",
        rightPreposition: prep.mit,
        wrongPreposition: prep.auf,
        case: "D",
        ko: "~와 잘 지내다",
        level: 1,
        example: "Ich verstehe mich gut mit meinen Kollegen."
    }, {
        id: 101,
        verb: "verstehen",
        rightPreposition: prep.von,
        wrongPreposition: prep.bei,
        case: "D",
        ko: "~에 대해 알다",
        level: 3,
        example: "Er versteht viel von Computern."
    }, {
        id: 102,
        verb: "sich vorbereiten",
        rightPreposition: prep.auf,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "~을 준비하다",
        level: 2,
        example: "Wir bereiten uns auf die Prüfung vor."
    }, {
        id: 103,
        verb: "warnen",
        rightPreposition: prep.vor,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~에 대해 경고하다",
        level: 3,
        example: "Der Lehrer warnt vor den Gefahren."
    }, {
        id: 104,
        verb: "warten",
        rightPreposition: prep.auf,
        wrongPreposition: prep.gegen,
        case: "A",
        ko: "~을 기다리다",
        level: 1,
        example: "Wir warten auf den Bus."
    }, {
        id: 105,
        verb: "sich wenden",
        rightPreposition: prep.an,
        wrongPreposition: prep.mit,
        case: "A",
        ko: "~에게 향하다 / 문의하다",
        level: 2,
        example: "Bitte wenden Sie sich an die Rezeption."
    }, {
        id: 106,
        verb: "werden",
        rightPreposition: prep.zu,
        wrongPreposition: prep.an,
        case: "D",
        ko: "~이 되다",
        level: 2,
        example: "Das Kind wird langsam zu einem Teenager."
    }, {
        id: 107,
        verb: "wissen",
        rightPreposition: prep.von,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~에 대해 알다",
        level: 3,
        example: "Ich weiß nichts von diesen Plänen."
    }, {
        id: 108,
        verb: "sich wundern",
        rightPreposition: prep.ueber,
        wrongPreposition: prep.an,
        case: "A",
        ko: "~에 대해 궁금해하다",
        level: 3,
        example: "Ich wundere mich über sein Verhalten."
    }, {
        id: 109,
        verb: "zuschauen",
        rightPreposition: prep.bei,
        wrongPreposition: prep.mit,
        case: "D",
        ko: "~을 구경하다",
        level: 2,
        example: "Wir schauen den Kindern beim Spielen zu."
    }, {
        id: 110,
        verb: "zusehen",
        rightPreposition: prep.bei,
        wrongPreposition: prep.an,
        case: "D",
        ko: "(무언가를 하면서) ~을 보다",
        level: 3,
        example: "Er sieht dem Handwerker bei der Arbeit zu."
    }, {
        id: 111,
        verb: "zweifeln",
        rightPreposition: prep.an,
        wrongPreposition: prep.bei,
        case: "A",
        ko: "~에 대해 의심하다",
        level: 4,
        example: "Ich zweifle an seiner Ehrlichkeit."
    }
];

export default verbs;
