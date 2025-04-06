const csvData = `
abhängen von D to depend upon
achten auf A to look after
anfangen mit D to begin with
ankommen auf A to depend upon
antworten auf A to reply to
sich ärgern über A to get upset about
aufhören mit D to quit sth
aufpassen auf A to look after
sich aufregen über A to get upset about
ausgeben für A to spend on
sich bedanken bei D to thank sb.
sich bedanken für A to thank for
beginnen mit D to begin
sich bemühen um A to strive for
berichten über A to report on
sich beschäftigen mit D to busy oneself with
sich beschweren bei D to complain to
bestehen aus D to consist of
bestehen auf A to insist upon
sich beteiligen an D to involve oneself with
sich bewerben bei D to apply at (workplace)
sich bewerben um A to apply for (job)
sich beziehen auf A to refer to
bitten um A to ask for
danken für A to thank for
denken an A to think of
diskutieren über A to discuss about
einladen zu D to invite to
sich entscheiden für A to opt for
sich entschließen zu D to decide upon
sich entschuldigen bei D to apologise to
sich entschuldigen für A to apologise for
erfahren von D to hear about
sich erholen von D to recover from
sich erinnern an A to remember
erkennen an D to know by
sich erkündigen nach D to enquire about
erschrecken über A to be shocked by
erzählen über A to recall about
erzählen von D to tell of
fragen nach A to ask about
sich freuen über A to be glad about
sich freuen auf A to look forward to
gehen um A to be about
gehören zu D to belong to
sich gewöhnen an A to get used to
glauben an A to believe in
gratulieren zu D to congratulate on
halten für A to reckon as
halten von D to think about / consider
sich handeln um A to involve
handeln von D to deal with (book etc.)
helfen bei D to help with
hindern an D to impede from
hoffen auf A to hope for
hören von D to hear from
sich informieren über A to learn about
sich interessen für A to be interested in
klagen über A to complain about
kämpfen für A to fight for
kommen zu D to come to / attend
sich konzentrieren auf A to concentrate on
sich kümmern um A to take care of (task, problem)
lachen über A to laugh at (joke)
leiden an D to suffer from
leiden über A to suffer as a result of
nachdenken über A to think something over
protestieren gegen A to protest against
rechnen mit D to expect / reckon on
reden über A to talk about
reden von D to talk of
riechen nach D to smell like / of
sagen über A to say about
sagen zu D to think about / say about / judge
schicken an D to send (sth.) to
schicken zu D to send (sb.) to
schimpfen über A to moan about
schmecken nach D to taste like / of
schreiben an A to write to
schützen vor D to protect against
sein für A to be for (sth.)
sein gegen A to be against (sth.)
sorgen für A to care / provide for
sprechen mit D to speak with
sprechen über A to speak about
sterben an D to die of
streiten mit D to argue with
streiten über A to argue about
teilnehmen an D to take part in
telefonieren mit D to call (sb.)
sich treffen mit D to meet with
sich treffen zu D to meet at (summit, sports game)
überreden zu D to persuade (sb.) to
sich unterhalten mit D to converse with
sich unterhalten über A to converse about
sich verabreden mit D to arrange to meet with (sb.)
sich verabschieden von D to say goodbye to
vergleichen mit D to compare with
sich verlassen auf A to rely on (sb. / sth.)
sich verlieben in A to fall in love with
sich verstehen mit D to get along with (sb.)
verstehen von D to know about
sich vorbereiten auf A to prepare oneself for
warnen vor D to warn about
warten auf A to wait for
sich wenden an A to turn / refer to
werden zu D to turn into
wissen von D to know about sth
sich wundern über A to wonder about
zuschauen bei D to spectate at
zusehen bei D to watch(while doing sth.)
zweifeln an A to doubt about `;

// Split the CSV data into lines and map to an array of objects
const csvLines = csvData.trim().split('\n');
const VERB_LIST = csvLines.map(line => {
    const words = line.split(/\s+/);
    let verb,
        preposition,
        caseType,
        english;

    // Überprüfen, ob das erste Wort "sich" ist
    if (words[0] === "sich") {
        verb = words[0] + ' ' + words[1]; // "sich" + das nächste Wort
        preposition = words[2];
        caseType = words[3];
        // Der Rest ist der englische Ausdruck
        english = words.slice(4).join(' '); // Alle nachfolgenden Wörter
    } else {
        verb = words[0];
        preposition = words[1];
        caseType = words[2];
        // Der Rest ist der englische Ausdruck
        english = words.slice(3).join(' '); // Alle nachfolgenden Wörter
    }

    return {verb, preposition, case: caseType, english};
});

export default VERB_LIST;
