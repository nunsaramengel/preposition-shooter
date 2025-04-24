import { useContext } from 'react';
import { GameContext } from "../game/GameContext"
import Shield from './Shield';
import CurrentVerb from './CurrentVerb';
import "../App.css"


export default function HUD() {
  const game = useContext(GameContext);

  const RESOURCE_VALUE_COLOR = {
    isEnough: "mediumspringgreen",
    isNotEnough: "lch(56.55 83.4 357.92 / 0.59)",    
  }

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
              {game.level}
            </span>
          </h1>
        </div>
        <br />
        <div className="single-panel">
          <h1 lang="ko" className="menu-h1 menu-current-verb">
            현재 미션:
            <br />
            <span className="menu-span current-verb">
              <CurrentVerb />
            </span>
          </h1>
        </div>
      </div>


      {game.isRingMenuOpen && game.selectedUpgrade && 
      <div lang="ko" className="upgrade-description">{game.selectedUpgrade.data.description}</div>
      
      }

      <div className='not-affordable-notification'>
        {game.isRingMenuOpen && game.selectedUpgrade && !game.selectedUpgrade.data.affordable && <span lang="ko">자원이나 크레딧이 부족합니다.</span>}
      </div>
      <div className="affordable-notification">
        {game.isRingMenuOpen && game.selectedUpgrade && game.selectedUpgrade.data.affordable && <span lang="ko">구매하시려면 ENTER를 누르세요.</span> }
      </div>
      <div>
        <div className="cost-panel">
        {game.isRingMenuOpen && game.selectedUpgrade &&
          <>
            <div className="single-resource-wrapper">
              <div className="single-resource-square-label-div"  lang="ko" style={{width: "17px", height: "17px", fontSize: "13px", backgroundColor: `${game.resources[0].color}`}}>금</div>
              <span className="gold-cost single-resource-value-span" style={{  color: `${game.resources[0].currentValue >= game.selectedUpgrade.data.cost.gold ? `${RESOURCE_VALUE_COLOR.isEnough}` : `${RESOURCE_VALUE_COLOR.isNotEnough}`}`}} lang="ko">{JSON.stringify(game.selectedUpgrade.data.cost.gold)}</span>
            </div>
            <div  className="single-resource-wrapper">
              <div className="single-resource-square-label-div"  lang="ko" style={{width: "17px", height: "17px", fontSize: "13px", backgroundColor: `${game.resources[1].color}`}}>리</div>
              <span className="lithium-cost single-resource-value-span" style={{ color: `${game.resources[1].currentValue >= game.selectedUpgrade.data.cost.lithium ? `${RESOURCE_VALUE_COLOR.isEnough}` : `${RESOURCE_VALUE_COLOR.isNotEnough}`}`}} lang="ko">{JSON.stringify(game.selectedUpgrade.data.cost.lithium)}</span>
            </div>
            <div className="single-resource-wrapper">
              <div className="single-resource-square-label-div"  lang="ko" style={{width: "17px", height: "17px", fontSize: "13px", backgroundColor: `${game.resources[2].color}`}}>플</div>
              <span className="plasma-cost single-resource-value-span" style={{ color: `${game.resources[2].currentValue >= game.selectedUpgrade.data.cost.plasma ? `${RESOURCE_VALUE_COLOR.isEnough}` : `${RESOURCE_VALUE_COLOR.isNotEnough}`}`}} lang="ko">{JSON.stringify(game.selectedUpgrade.data.cost.plasma)}</span>
            </div>
            <div className="single-resource-wrapper">
              <div className="single-resource-square-label-div"  lang="ko" style={{width: "17px", height: "17px", fontSize: "13px", backgroundColor: `${game.resources[3].color}`}}>티</div>
              <span className="titanium-cost single-resource-value-span" style={{ color: `${game.resources[3].currentValue >= game.selectedUpgrade.data.cost.titanium ? `${RESOURCE_VALUE_COLOR.isEnough}` : `${RESOURCE_VALUE_COLOR.isNotEnough}`}`}} lang="ko">{JSON.stringify(game.selectedUpgrade.data.cost.titanium)}</span>
            </div>
            <div className="single-resource-wrapper">
              <div className="single-resource-square-label-div"  lang="ko" style={{width: "17px", height: "17px", fontSize: "13px", backgroundColor: `${game.resources[4].color}`}}>철</div>
              <span className="iron-cost single-resource-value-span" style={{ color: `${game.resources[4].currentValue >= game.selectedUpgrade.data.cost.iron ? `${RESOURCE_VALUE_COLOR.isEnough}` : `${RESOURCE_VALUE_COLOR.isNotEnough}`}`}} lang="ko">{JSON.stringify(game.selectedUpgrade.data.cost.iron)}</span>
            </div>
            <div className="single-resource-wrapper">
              <div className="single-resource-square-label-div" lang="ko" style={{width: "17px", height: "17px", fontSize: "13px", backgroundColor: "white"}}>크</div>
              <span className="credits-cost single-resource-value-span" lang="ko" style={{color: `${game.credits >= game.selectedUpgrade.data.cost.credits ? `${RESOURCE_VALUE_COLOR.isEnough}`: `${RESOURCE_VALUE_COLOR.isNotEnough}` }`}}>{JSON.stringify(game.selectedUpgrade.data.cost.credits)}</span>
            </div>
            
          </>
        }
        </div>
      </div>


      <div className="upgrades-display">
        { /* DISPLAY FOR UPGRADS LIKE SUPER SHIELD; HYPER LASER; Y-LASER, X-LASER, TURBO-DRIVE, etc. */}
      </div>
    <div className="resources-container" style={{ position: "absolute", alignItems: "center", top: 600, paddingLeft: 10, display: "flex" }}>
      {game.resources.map(resource => (
        <div key={resource.id} style={{ display: "flex",   width: "160px" }}>
          <div style={{
            width: "0px", // Adjust the size of the sphere
            height: "0px",
            transform: "translateY(5px)",// Adjust the size of the sphere
            backgroundColor: resource.color, // Use the resource color
            marginRight: "2px" // Space between the sphere and the text
          }} />
            <span lang="ko" style={{color: resource.color, transform: "translateY(2px)"}}>{resource.ko}&nbsp;&nbsp;</span>
            <span lang="ko" style={{fontSize: "20px"}}>{resource.currentValue}</span>
          </div>
      ))}
      </div>
    </>
  );
}
