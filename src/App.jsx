import { useEffect, useState } from 'react'
import './App.css'
import { GameContext, data } from "./game/GameContext.js"
import GameStore from './game/GameStore.js'
import PhaserGame from './game/PhaserGame.jsx'
import HUD from './components/HUD.jsx'

function App() {

  const [state, setState] = useState(data)

  const update = (data) => {
    GameStore.update(data);
    setState((prev) => ({ ...prev, ...data, update }));
  }

  useEffect(() => {
    const unsubscribe = GameStore.subscribe((newState) => {
      setState({ ...newState, update })
    });

    return () => unsubscribe();
  }, [])
  

  return (
    <>
      <GameContext.Provider value={{ ...state, update }}>
        <HUD />
        <PhaserGame />
      </GameContext.Provider>
    </>
  )
}

export default App