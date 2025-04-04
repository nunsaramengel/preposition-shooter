import React, { useEffect } from 'react';

const Shield = ({ shield, setShield }) => {


    useEffect(() => {
        const newShieldValue = shield
        setShield(newShieldValue)
        console.log("shield value changed")
    }, [shield]) 
  // Quadrat-Symbole
  const filledSquare = '\u25A0'; // Gefülltes Quadrat
  const emptySquare = '\u25A1'; // Leeres Quadrat

  // Erstelle ein Array von Quadraten basierend auf dem shield-Wert
  const squares = Array.from({ length: 10 }, (_, index) => {
    // Wenn der Index kleiner ist als der aktuelle shield-Wert, zeige ein gefülltes Quadrat an
    // Ansonsten zeige ein leeres Quadrat an
    return index < (10 - shield) ? emptySquare : filledSquare;
  });

  return (
    <span style={{ lang: "de", color: "turquoise" }}>
      {squares.join('')} {/* Verbinde die Quadrate zu einem String */}
    </span>
  );
}

export default Shield;
