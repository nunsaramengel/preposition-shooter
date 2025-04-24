import React, { useContext } from 'react';
import { GameContext } from '../game/GameContext';

const Shield = () => {
    const game = useContext(GameContext);
    const squares = Array.from({ length: game.sceneConfig.shieldMaximum }, (_, index) => {
        return index < (game.sceneConfig.shieldMaximum - game.shield) ? '\u25A1' : '\u25A0';
    });
    return (
        <span style={{ lang: "de", color: game.sceneConfig.plasmaShield ? "turquoise" : "plum" }}>
            {squares.join('')}
        </span>
    );
};

export default Shield;