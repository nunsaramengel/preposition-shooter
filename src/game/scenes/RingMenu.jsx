import Phaser from "phaser";
import { preloadAssets } from "../preload";
import GameStore from "../GameStore";
import { Howl } from "howler";

class RingMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'RingMenu', active: false });
        this.menuItems = [];
        this.selectedItemIndex = 0;
        this.radius = 140;
        this.centerX = 0;
        this.centerY = 0;
        this.rotationAngle = 0; // Aktueller Rotationswinkel des Rings
        this.rotationSpeed = 0.3; // Geschwindigkeit der Rotation
        this.isRotating = false;
        this.rotationDirection = 1; // 1 für Uhrzeigersinn, -1 für Gegenuhrzeigersinn
        this.targetRotation = 0;
        this.animationDuration = 200; // Dauer der Rotationsanimation in Millisekunden
        this.animationStartTime = 0;
    }

    init(data) {
        this.menuItemsData = GameStore.menuItems || [];
        this.callback = data.callback || null;
        this.parentSceneKey = "Workshop" || null;
    }

    preload() {
        preloadAssets(this);
        this.menuItemsData.forEach(item => {
            if (item.icon) {
                this.load.image(item.name, item.icon);
            }
        });
        this.wooshSound = new Howl({ src: ["audio/woosh.wav"], volume: 0.2 })
        this.ringMenuOpenCloseSound = new Howl({src: ["audio/ringMenuOpenClose.wav"]})
    }

create() {
        this.menuItems.forEach(item => {
            if (item.icon) item.icon.destroy();
            if (item.text) item.text.destroy();
        });
        this.menuItems = [];
        this.selectedItemIndex = 0;

        const { width, height } = this.scale;
        this.centerX = width / 2;
        this.centerY = height / 2;

        this.add.image(this.centerX, this.centerY, 'ringMenuBG').setScale(0.75);

        const totalItems = GameStore.menuItems.length;
        const angleStep = (2 * Math.PI) / totalItems;
        const startOffset = -Math.PI / 2; // -90 Grad, um das erste Element nach oben zu verschieben

        this.menuItemsData.forEach((item, index) => {
            const angle = startOffset + angleStep * index; // Angepasster Startwinkel
            const x = this.centerX + this.radius * Math.cos(angle);
            const y = (this.centerY + this.radius * Math.sin(angle)) - 25;

            const icon = this.add.image(x, y, item.name).setScale(0.19);
            const text = this.add.text(x - 45, y + 50, item.label, { fontSize: '19px', color: '#fff', align: 'center', origin: [0.5, 0.5] });

            text.setInteractive();
            text.on('pointerdown', () => {
                this.selectItem(index);
            });

            this.menuItems.push({ icon, text, data: item, originalAngle: angle });
        });

        this.updateMenuItemPositions(); // Wichtig, um die Rotation anzuwenden
        this.selectItem(0); // Wählt das anfängliche (oberste) Element aus

        this.input.keyboard.off('keydown-LEFT', this.prevItem);
        this.input.keyboard.off('keydown-RIGHT', this.nextItem);
        this.input.keyboard.off('keydown-ENTER', this.confirmSelection);
        this.input.keyboard.off('keydown-ESC', this.closeMenu);

        this.input.keyboard.on('keydown-LEFT', () => this.rotateRing(-1), this);
        this.input.keyboard.on('keydown-RIGHT', () => this.rotateRing(1), this);
        this.input.keyboard.on('keydown-ENTER', this.confirmSelection, this);
        this.input.keyboard.on('keydown-ESC', this.closeMenu, this);
    }

    rotateRing(direction) {
        if (!this.isRotating) {
            this.isRotating = true;
            this.sound.play('woosh')
            this.rotationDirection = direction;
            this.animationStartTime = this.time.now + 100;
            this.targetRotation += (2 * Math.PI / this.menuItems.length) * -direction; // Zielwinkel basierend auf der Anzahl der Items
        }
    }
/*
updateMenuItemPositions() {
        const totalItems = this.menuItems.length;

        this.menuItems.forEach((item, index) => {
            const adjustedAngle = item.originalAngle + this.rotationAngle;
            const x = this.centerX + this.radius * Math.cos(adjustedAngle);
            const y = (this.centerY + this.radius * Math.sin(adjustedAngle)) - 25;

            item.icon.setPosition(x, y);
            item.text.setPosition(x - 45, y + 45);

            // Überprüfen, ob das Element sich nahe der 0-Grad-Position befindet
            const normalizedAngle = Phaser.Math.Wrap(adjustedAngle, -Math.PI, Math.PI);
            const isTop = Math.abs(normalizedAngle) < (2 * Math.PI / totalItems) / 2; // Toleranz anpassen

            const tint = isTop ? 0xF270D6 : 0xffffff;
            item.text.setTint(tint);
            item.icon.setTint(tint);

            if (isTop) {
                this.selectedItemIndex = index;
                GameStore.update({ selectedUpgrade: item });
            }
        });
}
*/
    
    updateMenuItemPositions() {
        const totalItems = this.menuItems.length;

        this.menuItems.forEach((item, index) => {
            const adjustedAngle = item.originalAngle + this.rotationAngle;
            const x = this.centerX + this.radius * Math.cos(adjustedAngle);
            const y = (this.centerY + this.radius * Math.sin(adjustedAngle)) - 25;

            if (item.icon) {
                item.icon.setPosition(x, y);
                const normalizedAngle = Phaser.Math.Wrap(adjustedAngle, -Math.PI, Math.PI);
                const isTop = Math.abs(normalizedAngle) < (2 * Math.PI / totalItems) / 2;

                let tint = isTop ? 0xF270D6 : 0xffffff;
                let alpha = 1; // Default alpha

                if (isTop) {
                    this.selectedItemIndex = index;
                    GameStore.update({ selectedUpgrade: item }); // Update selected upgrade in GameStore

                    // Check affordability of the currently selected upgrade
                    if (!this.canAffordUpgrade(item.data)) {
                        tint = 0x808080; // Grey out if unaffordable
                        alpha = 0.7; // Make it slightly transparent
                    }
                }

                if (item.text) {
                    item.text.setTint(tint);
                    item.text.setAlpha(alpha);
                }
                item.icon.setTint(tint);
                item.icon.setAlpha(alpha);
            }
            if (item.text) {
                item.text.setPosition(x - 45, y + 50);
            }
        });
    }
    
    
   canAffordUpgrade = (upgradeData) => {
        if (!upgradeData || !upgradeData.cost) {
            return true; // No cost defined, assume affordable
        }

        // Check resource costs
        for (const resource of GameStore.resources) {
            const requiredAmount = upgradeData.cost[resource.key];
            if (requiredAmount && resource.currentValue < requiredAmount) {
                return false; // Cannot afford this resource
            }
        }

        // Check credit cost
        if (upgradeData.cost.credits !== undefined && GameStore.credits < upgradeData.cost.credits) {
            return false; // Cannot afford the credits
        }

        return true; // Can afford all required resources and credits
    }

    selectItem(index) {
        // Die visuelle Selektion passiert jetzt durch die Rotation und die Hervorhebung des obersten Elements
        this.rotateToItem(index);
    }

    rotateToItem(targetIndex) {
        if (!this.isRotating) {
            this.isRotating = true;
            this.animationStartTime = this.time.now;
            const deltaIndex = targetIndex - this.selectedItemIndex;
            const shortestRotation = Phaser.Math.Wrap(deltaIndex, -(this.menuItems.length / 2), (this.menuItems.length / 2));
            this.targetRotation += (2 * Math.PI / this.menuItems.length) * -shortestRotation;
            this.rotationDirection = shortestRotation > 0 ? -1 : 1;
        }
    }

 confirmSelection() {
        if (this.selectedItemIndex !== null) {
            const selectedItemData = this.menuItems[this.selectedItemIndex].data;
            if (this.canAffordUpgrade(selectedItemData)) {
                if (this.callback) {
                    this.callback(selectedItemData);
                }
                this.closeMenu();
            } else {
                // Optionally provide feedback to the player that they can't afford it
                console.log("Cannot afford this upgrade!");
                this.sound.play('error')
                // You could add a temporary visual cue here (e.g., a quick shake animation, a sound effect)
            }
        }
    }

    closeMenu() {
        if (this.parentSceneKey) {
            this.scene.resume(this.parentSceneKey);
        }
        this.sound.play('whip')
        this.scene.stop('RingMenu');
        GameStore.update({ isRingMenuOpen: false });
    }

    update(time, delta) {
        if (this.isRotating) {
            const timeElapsed = time - this.animationStartTime;
            const progress = Phaser.Math.Clamp(timeElapsed / this.animationDuration, 0, 1);
            const easeProgress = Phaser.Math.Easing.Quadratic.Out(progress);

            this.rotationAngle = Phaser.Math.Linear(this.rotationAngle, this.targetRotation, easeProgress);
            this.updateMenuItemPositions();

            if (progress === 1) {
                this.isRotating = false;
                this.targetRotation = Phaser.Math.Wrap(this.targetRotation, -Math.PI, Math.PI);
                this.rotationAngle = this.targetRotation;
                this.updateMenuItemPositions(); // Sicherstellen, dass die Positionen final sind
            }
        }
    }
}

export default RingMenu;