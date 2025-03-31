import { useState } from 'react'
import './App.css'
import Game from './components/Game'

function App() {
  const [score, setScore] = useState(0)

  return (
    <div style={{ display: "float" }}>
      <h1 style={{ fontFamily: "monospace", color: "violet" }}>SCORE: <span style={{fontFamily: "monospace", color: "turquoise"}}>{score}</span></h1>
      <Game score={score} setScore={setScore} />
    </div>
  )
}

export default App
