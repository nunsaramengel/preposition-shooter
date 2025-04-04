import { useState, useEffect} from 'react'
import './styles/App.css'
import Game from './components/Game'
import CurrentVerbAndPreposition from './components/CurrentVerbAndPreposition'
import VERB_LIST from './assets/verblist'
import Shield from './components/Shield'

function App() {
  const INITIAL_VERB = VERB_LIST[Math.floor(Math.random() * VERB_LIST.length)];
  const INITIAL_SHIELD = 10;

  // information
  const [score, setScore] = useState(0)
  const [currentVerbAndPreposition, setCurrentVerbAndPreposition] = useState(INITIAL_VERB)
  const [shield, setShield] = useState(INITIAL_SHIELD)
  const [credits, setCredits] = useState(2000)

  const makeVerb = () => {
    const randomVerb = VERB_LIST[Math.floor(Math.random() * VERB_LIST.length)]
    setCurrentVerbAndPreposition(randomVerb)
    console.log(currentVerbAndPreposition)
  }

  useEffect(() => {
    console.log("The initial currentVerbAndPreposition is:", currentVerbAndPreposition)
  }, [])
  const handleClick = (e) => {
    e.preventDefault()
    makeVerb()
  }


  // Angenommen, VERB_LIST ist bereits definiert, wie in deinem Beispiel
const uniquePrepositions = new Set();

// Iteriere über die VERB_LIST und füge jede Präposition zum Set hinzu
VERB_LIST.forEach(verbEntry => {
    uniquePrepositions.add(verbEntry.preposition);
});

// Die Anzahl der verschiedenen Präpositionen
const prepList = Array.from(uniquePrepositions)

console.log(`Die 14 Präpositionen lauten: ${prepList}`);

  return (
    <div style={{ display: "float" }}>
      <Game score={score} setScore={setScore} shield={shield} setShield={setShield} style={{display: "flex"}}>
        <h1 style={{ lang: "de", color: "violet", textAlign: "right", padding: "12px", textShadow: "0 0 8px white" }}>
          SCORE:
          <br />
          <span lang="de" style={{  color: "turquoise", textShadow: "0 0 8px white" }}>
            {score}
          </span>
          <br /><br />
          <span lang="ko">방어막:</span>
          <br />
            <Shield shield={shield} setShield={setShield}></Shield>
        </h1>
        <h1 style={{textAlign: "right"}}>
          <span lang="ko" style={{color: "violet", padding: "12px", textShadow: "0 0 8px white"}}>크레딧:</span>
          <br />
            <span style={{ color: "turquoise", padding: "12px", textShadow: "0 0 8px white" }}>
          {credits}
        </span>
        </h1>
        <CurrentVerbAndPreposition currentVerbAndPreposition={currentVerbAndPreposition} />
        <br /><br />
      </Game>
    </div>
  )
}

export default App
