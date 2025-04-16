export default canAffordUpgrade = (upgradeData) => {
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