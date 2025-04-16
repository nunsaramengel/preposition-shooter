import Phaser from 'phaser'
import { preloadAssets } from '../preload'
import { Howl } from 'howler'
import fadeIn from '../func/fadeIn'
import GameStore from '../GameStore'

class Workshop extends Phaser.Scene {
    constructor() {
        super({key: 'Workshop'})
    }

    preload() {
        preloadAssets(this)
        this.ringMenuOpenCloseSound = new Howl({src: ["audio/ringMenuOpenClose.wav"]})
        this.workshopAmbienceSound = new Howl({ src: ['audio/workshop_ambience.mp3'], volume: 0.5 })
    }

    create() {
                fadeIn(this)
        // Starte Fade In der neuen Szene
        const workshopEngineerSaying = this.time.delayedCall(500, () => { 
            this.add.text(100, 200, `
Z 누르시면 우리가 제공하는 업그레이드를
확인하실 수 있습니다. ESC로 닫기.
        `,
                {fontSize: "18px"}
        )
        }, [], this)

        this.workshopAmbienceSound.play()
        this.input.keyboard.on('keydown-Z', this.openRingMenu, this)
        this.workshop = this.physics.add.image(0, 0, 'workshop').setOrigin(0, 0).setDepth(1).setScale(1)
    }


    openRingMenu() {
        this.scene.pause('Workshop');
        this.sound.play('whip')
        this.scene.launch('RingMenu', {
            items: GameStore.menuItems,
            callback: this.handleMenuSelection, // Funktion, die bei Auswahl ausgeführt wird
            parentSceneKey: 'Tutorial' // Key der aufrufenden Szene
        });
        GameStore.update({isRingMenuOpen: true})
        console.log("openRingMenu... isRingMenuOpen: ", GameStore.isRingMenuOpen)            
    }

    handleMenuSelection(selectedItem) {
        // Hier die Logik für die ausgewählte Menüaktion implementieren
        switch (selectedItem.label) {
            case '플라스마빔':
                console.log('플라스마빔 wurde benutzt!', selectedItem.cost);
                break;
            case '파워업플러스':
                console.log('파워업플러스 wurde benutzt!');
                break;
            case '플라스마쉴드':
                console.log('플라스마방어막 wurde benutzt!');
                break;
            case '터보엔진':
                console.log('터보 엔진 wurde benutzt!');
                break;
            case 'Y레이저빔':
                console.log('Y레이저빔 wurde benutzt!');
                break;
        }

    }

}

export default Workshop