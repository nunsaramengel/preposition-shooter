import { useContext } from 'react';
import { GameContext } from "../game/GameContext"
import Shield from './Shield';
import CurrentVerb from './CurrentVerb';
import "../App.css"

export default function HUD() {
  const game = useContext(GameContext);


  return (
    <>
      <div className="starship-panel" style={{
        position: 'absolute',
        top: 0,
        left: 800,
        paddingLeft: "10px",
        paddingTop: "40px",
        color: 'white',
        height: "648px",
      }}>
      <div className="single-panel">
        <h1 lang="ko" className="menu-h1">
          방어막:
          <br />
          <span className="menu-span">
            <Shield />
          </span>
        </h1>
      </div>
      <br />
      <div className="single-panel">
        <h1 lang="ko" className="menu-h1">
          희망:
          <br />
          <span className="menu-span">
            {game.score}
          </span>
        </h1>
      </div>
      <br />
      <div className="single-panel">  
        <h1 lang="ko" className="menu-h1">
          크레딧:
          <br />
          <span className="menu-span">
            {game.credits}
          </span>
        </h1>
      </div>
      <br />
      <div className="single-panel">
        <h1 lang="ko" className="menu-h1">
          레벨:
          <br />
          <span className="menu-span">
            {String(game.level)}
          </span>
        </h1>
      </div>
      <br />
      <div className="single-panel">
      <h1 lang="ko" className="menu-h1">
        현재 미션:
        <br />
        <span className="menu-span">
          <CurrentVerb />
        </span>
      </h1>
      </div>
    </div>
    <div className="resources-container" style={{ position: "absolute", alignItems: "center", top: 600, paddingLeft: 60, display: "flex" }}>
      <span lang="ko" style={{ color: "white", fontSize: "19px", alignItems: "center", marginRight: "10px" }} >
        자원
      </span>
      {game.resources.map(resource => (
        <div key={resource.id} style={{ display: "flex",   width: "120px" }}>
          <div style={{
            width: "20px", // Adjust the size of the sphere
            height: "20px", // Adjust the size of the sphere
            backgroundColor: resource.color, // Use the resource color
            marginRight: "5px" // Space between the sphere and the text
          }} />
            <span lang="ko" style={{color: resource.color}}>{resource.ko}&nbsp;&nbsp;</span>
            <span lang="de" style={{fontSize: "20px"}}>{resource.currentValue}</span>
          </div>
        ))}
      </div>
    </>
  );
}
