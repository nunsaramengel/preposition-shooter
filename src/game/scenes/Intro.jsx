import Phaser from "phaser";

class Intro extends Phaser.Scene{
    constructor() {
        super({key: "Intro"})
    
    }

    preload() {
        preloadAssets(this)
    }

    create() { 
        // stars
        this.physics.add.image(400, 300, 'earth').setDepth(1).setScale(1.4)
        this.stars = [];
        this.NUMBER_OF_STARS = 1000;
        for (let i = 0; i < this.NUMBER_OF_STARS; i++) { const star = this.createStar(); this.stars.push(star); }

        this.score = GameStore.score;
        this.shield = GameStore.shield;
        this.VERB_LIST = GameStore.verbs
        this.setScore = (amount) => {
            const newScore = Math.max(0, this.score + amount);
            GameStore.update({ score: newScore });
            this.score = newScore;
        };

        // ship
        this.SHIP_VELOCITY = 600;
        this.SHIP_SCALE = 0.19;
        this.ship = this.physics.add.image(400, 550, 'ship').setOrigin(0.5, 0.5).setCollideWorldBounds(true).setScale(this.SHIP_SCALE).setDepth(1);
    }

    update() {
        this.stars.forEach((star) => { star.y += star.speed; if (star.y > 600) { star.y = 0; star.x = Phaser.Math.Between(0, 800); star.speed = Phaser.Math.Between(1, 14); } star.graphics.setPosition(star.x, star.y); });
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

    
}

export default Intro;