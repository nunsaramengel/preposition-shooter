import Phaser from "phaser";
import { preloadAssets } from "../preload";
import GameStore from "../GameStore";
import TypewriterEffect from "../func/TypewriterEffect.js";
import Alert from "../func/Alert.js";
import { Howl } from "howler";
import fadeIn from "../func/fadeIn.js";


class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: "Tutorial" });
    }

    preload() {
        preloadAssets(this);
        this.load.audio('transmission7', 'audio/transmission7.mp3');
        this.arrow = this.add.image()

        // Stelle sicher, dass du den Sound hier lädst
    }

    create() {

        fadeIn(this)
        this.LASER_SCALE = 0.15;

        this.laserSpeedUpdate = GameStore.laserSpeedUpdate;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', this.shootLasers, this);

        this.bgMusic = new Howl({ src: ['audio/flashlight_loopable.wav'], volume: 0.4, onload: () => { console.log('Flashlight song loaded'); this.bgMusic.play(); }, onloaderror: (id, error) => console.error('Error loading howl sound:', error), loop: true });
        this.laserSound = new Howl({ src: ['audio/laser.mp3'], volume: 1.0, onload: () => console.log('Laser sound loaded'), onloaderror: (id, error) => console.error('Error loading laser sound:', error) });
        this.popInSound = new Howl({
            src: ['audio/popup.mp3']
        })
        this.beepSound = new Howl({
            src: ['audio/beep.wav']
        })
        this.consoleClickSound = new Howl({
            src: ['audio/console_click.wav'],
            volume: 1,
            onload: () => console.log('Console click sound loaded'),
            onloaderror: (id, error) => console.error('Error loading ship explosion sound: ', error, " ## id: ", id)
        })
        this.transmissionSound = new Howl({
            src: ['audio/transmission7.mp3'],
            loop: false // Set loop to true initially
        });


        // stars
        this.stars = [];
        this.NUMBER_OF_STARS = 1000;
        for (let i = 0; i < this.NUMBER_OF_STARS; i++) {
            const star = this.createStar();
            this.stars.push(star);
        }

        this.score = GameStore.score;
        this.shield = GameStore.shield;
        this.VERB_LIST = GameStore.verbs;
        this.setScore = (amount) => {
            const newScore = Math.max(0, this.score + amount);
            GameStore.update({ score: newScore });
            this.score = newScore;
        };

        // First Text
        this.welcomeText = `
튜토리얼에 오신 것을 환영합니다, 사령관님!
왼쪽 화살표 키와 오른쪽 화살표 키를 사용하여
함선을 왼쪽과 오른쪽으로 움직이실 수 있습니다.
        `

    this.currentMissionText = `
현재 미션이란 동사인데 이 동사에 맞는 전치사를
획득하시면 인류 생존에 대한 <희망>이 증가됩니다.
    `

        this.shieldsText = `
함선 방어막은 여기서 확인할 수 있습니다.
현재 최댓값은 10이며, 소행성에 부딪히거나
다른 함선의 레이저에 맞으면 방어막이
감소합니다. 하지만 방어막을 재충전해 주는
파워업 아이템이 있는데, 함선으로 획득하면
방어막이 다시 충전됩니다.
        `

        this.hopeText = `
그리고 소행성을 레이저로 쏴서 파괴할 수 없을 때
지구를 향해 날아가므로 희망이 감소합니다.
그러니 소행성을 최대한 많이 파괴하십시오, 사령관님!
그리고 현재 임무인 동사와 어울리지 않는 전치사도 꼭
피하십시오. 부딪히면 희망이 또 감소하니까요.
        `
        this.laserText = `
소행성을 파괴하려면 레이저로 두번 쏘셔야 합니다.
레이저빔은 스페이스 바를 누르시면 왼쪽, 오른쪽에
하나씩 발사됩니다.
        `
        this.creditsText = `
크레딧은 은하계에서 널리 통용되는 화폐입니다.
엔지니어와 상인들에게 함선 업그레이드나 확장 부품을
구매하는 데 사용할 수 있습니다.
        `
        this.resourcesText = `
우주 공간 어디에서든 자원을 수집할 수 있습니다.
상인들과 엔지니어는 함선을 개선하는 데 이 자원들을
필요로 하므로 열심히 획득하세요.
        `
  
        this.welcomeTypewriter = new TypewriterEffect(this, this.welcomeText, {
            x: 100,
            y: 100,
            typingSpeed: 20,
            textStyle: {
                fontSize: "20px",
                fill: "#f0f0f0"
            },
            onComplete: () => {
                const image2 = new Alert(this, 'arrowLM', 350, 300)
                const image = new Alert(this, 'arrowRM', 450, 300)
                image2.display()
                this.popInSound.play()
                this.popInSound.play()
                image.display()
                this.time.delayedCall(2500, () => {
                    this.welcomeTypewriter.textDisplay.destroy()
                }, [], this)
                // Hier kannst du weitere Aktionen ausführen, nachdem der Text fertig ist
            }
        });

        // Starte den Typewriter-Effekt einmalig in der create()-Methode
        this.welcomeTypewriter.start();


        this.shieldsTextTypewriter = new TypewriterEffect(this, this.shieldsText, {
            x: 100,
            y: 100,
            typingSpeed: 30,
            textStyle: {
                fontSize: "20px",
                fill: "#f0f0f0"
            },
            onComplete: () => {
                const pointer = new Alert(this, 'pointingArrowRightMagenta', 760, 80)
                pointer.display()
                this.popInSound.play()
                const asteroidImg = new Alert(this, 'asteroid', 400, 350)
                asteroidImg.display()
                this.popInSound.play()
                this.time.delayedCall(2500, () => {
                    this.shieldsTextTypewriter.textDisplay.destroy()
                }, [], this)
                // Hier kannst du weitere Aktionen ausführen, nachdem der Text fertig ist
            }
        });

        this.time.delayedCall(4246, () => {
            this.shieldsTextTypewriter.start()
        }, [], this)
        // ship
        this.SHIP_VELOCITY = 600;
        this.SHIP_SCALE = GameStore.shipScale;
        this.shipVelocityX = 0;
        this.laserSpeed = 800 + this.laserSpeedUpdate;
        this.ship = this.physics.add.image(400, 550, 'shipP').setOrigin(0.5, 0.5).setCollideWorldBounds(true).setScale(this.SHIP_SCALE).setDepth(1);
        this.lasers = this.physics.add.group({ defaultKey: 'laser', maxSize: 6 });

        this.laserTypewriter = new TypewriterEffect(this, this.laserText, {
            x: 100,
            y: 100,
            typingSpeed: 30,
            textStyle: {
                fontSize: "20px",
                fill: "#f0f0f0"
            },
            onComplete: () => {
                const spaceBarImg = new Alert(this, "spaceBarM", 400, 350)  
                spaceBarImg.display()
                this.popInSound.play()
                this.time.delayedCall(2500, () => {
                    this.laserTypewriter.textDisplay.destroy()  
                    this.time.delayedCall(800, () => {
                        this.creditsTypewriter.start()
                     }, [], this)
                }, [], this)
            }
        })

    this.hopeTypewriter = new TypewriterEffect(this, this.hopeText, {
            x: 100,
            y: 100,
            typingSpeed: 30,
            textStyle: {
                fontSize: "20px",
                fill: "#f0f0f0"
            },
            onComplete: () => {
                this.time.delayedCall(2500, () => {
                    this.hopeTypewriter.textDisplay.destroy()
                    this.time.delayedCall(800, () => {
                        this.laserTypewriter.start()
                     }, [], this)
                }, [], this)
                // Hier kannst du weitere Aktionen ausführen, nachdem der Text fertig ist
            }
        })

    this.currentMissionTypewriter = new TypewriterEffect(this, this.currentMissionText, {
            x: 100,
            y: 100,
            typingSpeed: 30,
            textStyle: {
                fontSize: "20px",
                fill: "#f0f0f0"
            },
            onComplete: () => {
                const pointer = new Alert(this, 'pointingArrowRightMagenta', 760, 450)
                const pointerHope = new Alert(this, 'pointingArrowRightMagenta', 760, 155 )
                pointer.display()
                pointerHope.display()
                this.popInSound.play()
                this.popInSound.play()
                this.time.delayedCall(2500, () => {
                    this.currentMissionTypewriter.textDisplay.destroy()
                    this.time.delayedCall(800, () => {
                        this.hopeTypewriter.start()
                     }, [], this)
                }, [], this)
                // Hier kannst du weitere Aktionen ausführen, nachdem der Text fertig ist
            }
    })
        
        

        
        this.time.delayedCall(11500, () => { 
            this.currentMissionTypewriter.start();
        }, [], this)


        this.creditsTypewriter = new TypewriterEffect(this, this.creditsText, {
            x: 100,
            y: 100,
            typingSpeed: 30,
            textStyle: {
                fontSize: "20px",
                fill: "#f0f0f0"
            },
            onComplete: () => {
                console.log("credits")
                const creditsPointer = new Alert(this, "pointingArrowRightMagenta", 760, 240)
                creditsPointer.display()
                this.popInSound.play()
                this.time.delayedCall(2500, () => {
                    this.creditsTypewriter.textDisplay.destroy()
                    this.time.delayedCall(800, () => {
                        this.resourcesTypewriter.start()
                     }, [], this)
                }, [], this)
            }
        })

        this.resourcesTypewriter = new TypewriterEffect(this, this.resourcesText, {
            x: 100,
            y: 100,
            typingSpeed: 30,
            textStyle: {
                fontSize: "20px",
                fill: "#f0f0f0",
            },
            onComplete: () => {
                console.log("resources")
                const resourcesPointer = new Alert(this, "arrowBLM", 720, 570)
                resourcesPointer.display()
                this.popInSound.play()
                this.time.delayedCall(2500, () => {
                    this.resourcesTypewriter.textDisplay.destroy()
                    this.time.delayedCall(800, () => {
                        const startGameButton = this.add.text(100, 340, '전치사 사냥 시작', { fontSize: '20px', fill: '#12F1D3' })
                            .setInteractive()
                            .on('pointerdown', () => {
                                this.beepSound.play()
                                this.transmissionSound.stop()
                                this.bgMusic.stop()
                                this.scene.start('Shooter');
                            })
                            .on('pointerover', () => {
                                startGameButton.setStyle({ fill: '#ff0ff0' });
                                this.consoleClickSound.play()
                            })
                            .on('pointerout', () => {
                                startGameButton.setStyle({ fill: '#12F1D3' });
                            });
                     }, [], this)
                }, [], this)
            }
        })
}



    update() {

        this.ship.setVelocityX(this.shipVelocityX);
        if (this.cursors.left.isDown) { this.ship.setVelocityX(this.SHIP_VELOCITY * -1); } else if (this.cursors.right.isDown) { this.ship.setVelocityX(this.SHIP_VELOCITY); } else { this.ship.setVelocityX(this.shipVelocityX); }
        this.lasers.children.iterate((laser) => { if (laser && laser.y < 0) { laser.destroy(); } });
        this.stars.forEach((star) => { star.y += star.speed; if (star.y > 600) { star.y = 0; star.x = Phaser.Math.Between(0, 800); star.speed = Phaser.Math.Between(1, 14); } star.graphics.setPosition(star.x, star.y); });


        this.stars.forEach((star) => {
            star.y += star.speed;
            if (star.y > 600) {
                star.y = 0;
                star.x = Phaser.Math.Between(0, 800);
                star.speed = Phaser.Math.Between(1, 14);
            }
            star.graphics.setPosition(star.x, star.y);
        });


        // Entferne den Aufruf von this.welcomeTypewriter.start() aus der update()-Methode
    }

    createStar() {
        const x = Phaser.Math.Between(0, 800);
        const y = Phaser.Math.Between(0, 600);
        const size = Phaser.Math.Between(0.4, 1.3);
        const speed = Phaser.Math.Between(1, 6);
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(x, y, size);
        return { x, y, size, speed, graphics };
    }

    shootLasers() {
        if (this.lasers.getLength() < this.lasers.maxSize) {
            const shipWidth = this.ship.width * this.ship.scaleX;
            const leftLaser = this.lasers.get();
            if (leftLaser) {
                leftLaser.setActive(true);
                leftLaser.setVisible(true);
                leftLaser.setPosition(this.ship.x - shipWidth / 2, this.ship.y - 10);
                leftLaser.setScale(this.LASER_SCALE);
                leftLaser.setVelocityY(-this.laserSpeed);
                this.laserSound.play();
            }
            const rightLaser = this.lasers.get();
            if (rightLaser) {
                rightLaser.setActive(true);
                rightLaser.setVisible(true);
                rightLaser.setPosition(this.ship.x + shipWidth / 2, this.ship.y - 10);
                rightLaser.setScale(this.LASER_SCALE);
                rightLaser.setVelocityY(-this.laserSpeed);
                this.laserSound.play();
            }
        }
    }


}

export default Tutorial;