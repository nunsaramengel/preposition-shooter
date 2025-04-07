import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import NameInput from './scenes/NameInput.jsx';
import MainMenu from './scenes/MainMenu.jsx';
import ApproachingStarBaseMonitor from './scenes/ApproachingStarBaseMonitor.jsx';
import Shooter from './scenes/Shooter.jsx';
import PrepositionCruiser from './scenes/PrepositionCruiser.jsx';
import StarBase from './scenes/StarBase.jsx';
import GameOver from './scenes/GameOver.jsx';
import { preloadAssets } from './preload.js';

export default function PhaserGame() {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return;

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-container',
      scene: [
        MainMenu,
        PrepositionCruiser,
        ApproachingStarBaseMonitor,
        Shooter,
        StarBase,
        GameOver
      ],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div id="phaser-container" />;
}