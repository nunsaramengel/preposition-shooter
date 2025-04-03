import React from 'react'

const CurrentVerbAndPreposition = ({currentVerbAndPreposition, setCurrentVerbAndPreposition}) => {
    return (
      <div className="current-mission-container">            
        <div lang="ko" className="current-mission-label" style={{textAlign: "right", padding: "12px", textShadow: "0 0 8px white"}} ><b> 현재 미션 </b><br />
          <div lang="de" className="current-verb" style={{textAlign: "right", overflowWrap: 'break-word', padding: "12px"}}>
            {currentVerbAndPreposition.verb}
          </div>
        </div>
      </div>
        
  )
}

export default CurrentVerbAndPreposition