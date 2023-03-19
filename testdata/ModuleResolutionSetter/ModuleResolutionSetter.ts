import { CDDConfiguration, config } from "../../src/runner/config.js";
import { EnvironmentManipulatorType } from "../../src/types/EnvironmentManipulatorType.js";

export class ModuleResolutionSetter implements EnvironmentManipulatorType {
    oldconfig: CDDConfiguration = {
        moduleResolution: "",
        jsDir: ""
    };

    constructor(readonly newConfig: CDDConfiguration) {
    }

    setUp = (): void => {
        this.oldconfig.jsDir = config.jsDir;
        this.oldconfig.moduleResolution = config.moduleResolution;
        config.moduleResolution = this.newConfig.moduleResolution;
        config.jsDir = this.newConfig.jsDir;
    };

    tearDown = (): void => {
        config.jsDir = this.oldconfig.jsDir;
        config.moduleResolution = this.oldconfig.moduleResolution;
    };
}
