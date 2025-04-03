import React from 'react'
import { RESOURCES as resourceData } from '../assets/resources.js';

const Resources = () => {


    const RES_DATA = resourceData
  return (
      <div style={{
          position: "absolute", 
          top: "660px",
          left: "220px",
           color: "red"
      }}>
          {RES_DATA.map((resource, index) =>
            (
                <span key={index}>
                  <span style={{ color: `${resource.color}`, fontSize: "3rem", verticalAlign: "middle", display: "inline-block", transform: "translateY(-5px)" }}>
                    &#9632; {/* oder ● für den gefüllten Kreis */}
                    </span>
                    <span lang="de" style={{ color: "white" }}>
                        {resource.currentValue}
                  </span>
                  &nbsp;
                  &nbsp;
                  </span>
            ))
        }
      </div>
  )
}

export default Resources