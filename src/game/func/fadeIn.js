
const fadeIn = (scene) => {
    scene.cameras.main.setAlpha(0);

    scene.tweens.add({
        targets: scene.cameras.main,
        alpha: 1,
        duration: 800,
        ease: 'Linear'
    })
}

export default fadeIn
