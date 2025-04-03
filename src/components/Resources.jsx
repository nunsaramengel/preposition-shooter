import React from 'react';
import { RESOURCES as resourceData } from '../assets/resources.js';

const Resources = () => {
    const RES_DATA = resourceData;
    return (
        <div style={{
            position: "absolute", 
            backgroundColor: "#121212",
            top: "660px",
            left: "220px",
            padding: "0 10px",
            lineHeight: "22px",
            color: "red",
            display: "flex", // Flexbox auf die äußere div anwenden
            flexWrap: "wrap",
            width: "800px"// Damit die Elemente in die nächste Zeile umgebrochen werden, wenn der Platz nicht ausreicht
        }}>
            {RES_DATA.map((resource, index) => (
                <div key={index} style={{ width: "100px", margin: "5px" }}> {/* margin hinzufügen für Abstand */}
                    <span lang="de" style={{color: `${resource.color}`, textShadow: "0px 0px 1px white"}}>{resource.preposition}</span>
                    <span style={{ color: `${resource.color}`, fontSize: "3rem", verticalAlign: "middle", display: "inline-block", transform: "translateY(-4px)" }}>
                        &#9632; {/* oder ● für den gefüllten Kreis */}
                    </span>
                    <span lang="de" style={{ color: "white" }}>
                        {resource.currentValue}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Resources;
