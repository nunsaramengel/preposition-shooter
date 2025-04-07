class Question {
    constructor(verb) {
        this.verb = verb.verb;
        this.rightPreposition = verb.rightAnswer;
        this.wrongPreposition = verb.wrongAnswer;
        this.question = verb.question;
        this.level = verb.level
    }
}

export default Question
