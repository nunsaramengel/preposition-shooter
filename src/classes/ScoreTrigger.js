export default class ScoreTrigger {
    constructor(scene, triggers) {
        this.scene = scene;
        this.triggers = new Map(Object.entries(triggers).map(([score, actionConfig]) => [
            parseInt(score, 10),
            actionConfig
        ]));
        this.triggeredScores = new Set();
    }

    checkScore() {
        const currentScore = this.scene.score;

        for (const [threshold, actionConfig] of this.triggers) {
            if (currentScore >= threshold && !this.triggeredScores.has(threshold)) {
                this.triggeredScores.add(threshold);
                this.executeActions(actionConfig);
            }
        }
    }


    executeActions(actionConfig) {
        if (actionConfig.setCurrentVerb) {
            this.scene.setCurrentVerb();
        }
        if (actionConfig.displayAlert) {
            this.scene.displayAlert(typeof actionConfig.displayAlert === 'function' ? actionConfig.displayAlert() : actionConfig.displayAlert);
        }
        if (actionConfig.playNewMissionSound) {
            this.scene.newMissionSound.play();
        }
        if (actionConfig.clearPrepositionGroup) {
            this.scene.prepositionGroup.clear(true, true);
        }
        if (actionConfig.changeScene) {
            this.scene.time.delayedCall(actionConfig.changeSceneDelay || 0, () => {
                this.scene.scene.start(actionConfig.changeScene);
            }, [], this.scene);
        }
        if (actionConfig.customAction) {
            actionConfig.customAction.call(this.scene);
        }
        if (actionConfig.setScoreAmount !== undefined) {
            this.scene.setScore(actionConfig.setScoreAmount);
        }
        if (actionConfig.setLevel !== undefined) {
            this.scene.setLevel(actionConfig.setLevel);
        }

    }

}
