import React from 'react'
import GameStore from '../game/GameStore'

const CurrentVerb = () => {


  
  return (
    <div lang="de" style={{color: "mediumvioletred", fontSize: "3.3rem", textShadow: "0 0 5px rgba(255 255 255 / 0.23),         0 0 10px rgba(244 117 180 / 0.24)"}}>{GameStore.currentVerb.verb || "warten"}</div>
  )
}

export default CurrentVerb