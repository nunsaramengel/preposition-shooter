import Phaser from "phaser";
import { preloadAssets } from "../preload";
import GameStore from "../GameStore";
import Notification from "../func/Notification";
import { Howl } from "howler";

class RingMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'RingMenu', active: false });
        this.menuItems = [];
        this.selectedItemIndex = null;
        this.radius = 140;
        this.centerX = 0;
        this.centerY = 0;
        this.rotationAngle = 0;
        this.rotationSpeed = 0.3;
        this.isRotating = false;
        this.rotationDirection = 1;
        this.targetRotation = 0;
        this.animationDuration = 200;
        this.animationStartTime = 0;
        this.confirmingUpgrade = false;
        this.confirmationText = null;
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
        this.wooshSound = new Howl({ src: ["audio/woosh.wav"], volume: 0.2 });
        this.ringMenuOpenCloseSound = new Howl({ src: ["audio/ringMenuOpenClose.wav"] });
        this.confirmationSound = new Howl({ src: ["audio/confirmation.wav"], volume: 0.5 });
        this.upgradeSuccessSound = new Howl({ src: ["audio/upgradeSuccess.wav"], volume: 0.5 });
    }

    create() {
        this.menuItems.forEach(item => {
            if (item.icon) item.icon.destroy();
            if (item.text) item.text.destroy();
        });
        this.menuItems = [];
        this.selectedItemIndex = 0;
        this.confirmingUpgrade = false;
        if (this.confirmationText) this.confirmationText.destroy();
        this.confirmationText = null;

        const { width, height } = this.scale;
        this.centerX = width / 2;
        this.centerY = height / 2;

        this.add.image(this.centerX, this.centerY, 'ringMenuBG').setScale(0.75);

        const totalItems = GameStore.menuItems.length;
        const angleStep = (2 * Math.PI) / totalItems;
        const initialOffset = Math.PI - 180;
        const visualOffset = Math.PI / 6;

        const startOffset = initialOffset - visualOffset;

        this.menuItemsData = GameStore.menuItems; // Stelle sicher, dass wir immer die aktuelle Version aus dem Store verwenden

        this.menuItemsData.forEach((item, index) => {
            const angle = startOffset + angleStep * index;
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

        this.updateMenuItemPositions();
        this.selectItem(0);

        this.input.keyboard.off('keydown-LEFT', this.rotateLeft);
        this.input.keyboard.off('keydown-RIGHT', this.rotateRight);
        this.input.keyboard.off('keydown-ENTER', this.handleEnter);
        this.input.keyboard.off('keydown-ESC', this.handleEsc);

        this.rotateLeft = () => this.rotateRing(-1);
        this.rotateRight = () => this.rotateRing(1);
        this.handleEnter = () => {
            if (this.confirmingUpgrade) {
                this.executeUpgrade();
            } else {
                this.confirmSelection();
            }
        };
        this.handleEsc = () => {
            if (this.confirmingUpgrade) {
                this.cancelUpgrade();
            } else {
                this.closeMenu();
            }
        };

        this.input.keyboard.on('keydown-LEFT', this.rotateLeft, this);
        this.input.keyboard.on('keydown-RIGHT', this.rotateRight, this);
        this.input.keyboard.on('keydown-ENTER', this.handleEnter, this);
        this.input.keyboard.on('keydown-ESC', this.handleEsc, this);
    }

    rotateRing(direction) {
        if (!this.isRotating && !this.confirmingUpgrade) {
            this.isRotating = true;
            this.sound.play('woosh');
            this.rotationDirection = direction;
            this.animationStartTime = this.time.now + 100;
            this.targetRotation += (2 * Math.PI / this.menuItems.length) * -direction;
        }
    }

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

                let iconTint = isTop ? 0xffffff : 0x959595;
                let textTint = isTop ? 0xF425B9 : 0x959595;
                let alpha = 1;

                if (isTop) {
                    this.selectedItemIndex = index;
                    GameStore.update({ selectedUpgrade: item });

                    if (!this.canAffordUpgrade(item.data)) {
                        iconTint = 0x808080;
                        textTint = 0x959595;
                        alpha = 0.5;
                    } else if (this.canAffordUpgrade(item.data)) {
                        iconTint = 0xFFFFFF;
                        textTint = 0xf235b9;
                        alpha = 1;
                    }
                }

                if (item.text) {
                    item.text.setTint(textTint);
                    item.text.setAlpha(alpha);
                }
                item.icon.setTint(iconTint);
                item.icon.setAlpha(alpha);
            }
            if (item.text) {
                item.text.setPosition(x - 45, y + 50);
            }
        });
    }


    canAffordUpgrade = (upgradeData) => {
        if (!upgradeData || !upgradeData.cost) {
            return true;
        }

        for (const resource of GameStore.resources) {
            const requiredAmount = upgradeData.cost[resource.key];
            if (requiredAmount && GameStore.resources.find(r => r.key === resource.key).currentValue < requiredAmount) {
                return false;
            }
        }

        if (upgradeData.cost.credits !== undefined && GameStore.credits < upgradeData.cost.credits) {
            return false;
        }

        return true;
    }

    selectItem(index) {
        if (!this.confirmingUpgrade) {
            this.rotateToItem(index);
        }
    }

    rotateToItem(targetIndex) {
        if (!this.isRotating && !this.confirmingUpgrade) {
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
                this.startConfirmation();
            } else {
                console.log("Cannot afford this upgrade!");
                this.sound.play('error');
            }
        }
    }

    startConfirmation() {
        this.confirmingUpgrade = true;
        this.isRotating = false;
        if (this.confirmationText) this.confirmationText.destroy();
        this.confirmationText = this.add.text(
            this.centerX,
            this.centerY + this.radius + 40,
            "Upgrade kaufen?\n[ENTER] Ja / [ESC] Nein",
            { fontSize: '22px', color: '#fff', align: 'center', origin: [0.5, 0.5] }
        );
        // this.sound.play('confirmation');
    }

    cancelUpgrade() {
        this.confirmingUpgrade = false;
        if (this.confirmationText) this.confirmationText.destroy();
        this.confirmationText = null;
        this.sound.play('whip');
    }

    executeUpgrade() {
        if (this.selectedItemIndex !== null) {
            const selectedItemData = this.menuItems[this.selectedItemIndex].data;
            if (this.canAffordUpgrade(selectedItemData)) {
                // Führe hier die eigentliche Upgrade-Logik aus
                if (this.callback) {
                    this.callback(selectedItemData);
                }

                // 1. Entferne das gekaufte Item aus GameStore.menuItems über die update()-Funktion
                GameStore.update({
                    menuItems: GameStore.menuItems.filter(item => item.name !== selectedItemData.name)
                });

                // 2. Rufe create() erneut auf, um das Menü neu zu zeichnen
                this.create();

                this.closeMenu("업그레이드가 성공적으로 설치되었습니다");
                // this.sound.play('upgradeSuccess');
            } else {
                console.log("Cannot afford this upgrade (after confirmation)!");
                this.sound.play('error');
                this.cancelUpgrade();
            }
        }
    }

    closeMenu(alertMessage = null) {
        if (this.parentSceneKey) {
            this.scene.resume(this.parentSceneKey);
        }
        this.sound.play('ringMenuOpenCloseSound');
        this.scene.stop('RingMenu');
        GameStore.update({ isRingMenuOpen: false });
        if (alertMessage) {
            let alert = new Notification(this, alertMessage);
            alert.display();
            console.log("if alertMessage = TRUE");
        }
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
                this.updateMenuItemPositions();
            }
        }
    }

    installUpgrade = (upgrade) => {
        
    }
}

export default RingMenu;