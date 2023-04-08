import { GlobalObject } from "./SideEffectCheckerTestData.js";

export const EnvironmentmanipulatortestData = {
    thrice: () => {
        return {
            setUp: () => {
                GlobalObject.multiplier = 3;
            },
            tearDown: () => {
                GlobalObject.multiplier = 1;
            }
        };
    }
}