import Phaser from 'phaser';
import GameStore from '../game/GameStore';
import Notification from '../game/func/Notification';

export default class PowerUpManager {
    constructor(scene, powerupsGroup, ship, resourceMap, powerupImages, powerupSound, pickUpPowerUpSound, config = {}) {
        this.scene = scene;
        this.powerups = powerupsGroup;
        this.ship = ship;
        this.resourceMap = resourceMap;
        this.powerupImages = powerupImages;
        this.powerupSound = powerupSound;
        this.pickUpPowerUpSound = pickUpPowerUpSound;
        this.powerupTimer = null;
        this.asteroidMinSpeed = config.asteroidMinSpeed || 120; // Aus deiner Shooter-Klasse
        this.asteroidMaxSpeed = 220; // Aus deiner Shooter-Klasse
        this.asteroidRotationSpeed = 500; // Aus deiner Shooter-Klasse
        this.maxShield = GameStore.sceneConfig.shieldMaximum; // Aus deiner Shooter-Klasse
    }

    startSpawner(minInterval = 2000, maxInterval = 6000) {
        const spawnInterval = Phaser.Math.Between(minInterval, maxInterval);
        this.powerupTimer = this.scene.time.addEvent({delay: spawnInterval, callback: this.spawn, callbackScope: this, loop: true});
    }

    stopSpawner() {
        if (this.powerupTimer) {
            this.powerupTimer.destroy();
            this.powerupTimer = null;
        }
    }

    spawn() {
        const x = Phaser.Math.Between(50, 750);
        const y = -50;
        const randomPowerupImage = this.powerupImages[Phaser.Math.Between(0, this.powerupImages.length - 1)];
        const powerup = this.powerups.create(x, y, randomPowerupImage);
        powerup.setScale(GameStore.POWERUP_SCALE);
        powerup.setVelocityY(Phaser.Math.Between(this.asteroidMinSpeed, this.asteroidMaxSpeed));
        const randomRotationSpeed = Phaser.Math.Between(this.asteroidRotationSpeed * -1, this.asteroidRotationSpeed);
        powerup.setAngularVelocity(randomRotationSpeed);
    }

    collect(ship, powerup) { // <-- Nimm jetzt beide Objekte entgegen
        const powerupKey = powerup.texture.key;
        const powerupData = this.resourceMap[powerupKey];

        if (powerupData) {
            this.powerupSound.play();
            if (powerupData.key === 'resources') {
                const currentResources = [...GameStore.resources];
                const resourceIndex = currentResources.findIndex(r => r.id === powerupData.id);
                if (resourceIndex !== -1) {
                    currentResources[resourceIndex].currentValue += powerupData.amount;
                    GameStore.update({resources: currentResources});
                    const newNotificationText = `${
                        powerupData.amount
                    } ${
                        GameStore.resources[powerupData.id].ko
                    } 획득!`;
                    const newNotification = new Notification(this.scene, newNotificationText);
                    newNotification.display();
                }
            } else if (powerupData.key === 'shield') {
                const newShield = Math.min(this.maxShield, GameStore.shield + powerupData.amount);
                GameStore.update({shield: newShield});
                const newNotificationText = `쉴드가 ${
                    powerupData.amount
                } 증가했습니다!`;
                const newNotification = new Notification(this.scene, newNotificationText);
                newNotification.display();
            }
            powerup.destroy();
        }
    }
}
