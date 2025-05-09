import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import NameInput from './scenes/NameInput.jsx';
import MainMenu from './scenes/MainMenu.jsx';
import ApproachingStarBaseMonitor from './scenes/ApproachingStarBaseMonitor.jsx';
import Shooter from './scenes/Shooter.jsx';
import OnboardComputer from './scenes/OnboardComputer.jsx';
import PrepositionCruiser from './scenes/PrepositionCruiser.jsx';
import StarBase from './scenes/StarBase.jsx';
import WrongAnswer from './scenes/WrongAnswer.jsx';
import ComputerRoom from './scenes/ComputerRoom.jsx';
import Level2 from './scenes/Level2.jsx';
import GameOver from './scenes/GameOver.jsx';
import Test from './scenes/Test.jsx';
import Tutorial from './scenes/Tutorial.jsx';
import RingMenu from './scenes/RingMenu.jsx';
import Workshop from './scenes/Workshop.jsx';
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
        GameOver,
        Shooter,
        StarBase,
        ComputerRoom,
        PrepositionCruiser,
        Workshop,
        OnboardComputer,
        Test,
        Tutorial,
        WrongAnswer,
        RingMenu,
        ApproachingStarBaseMonitor,
        Level2,
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