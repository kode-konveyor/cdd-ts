import { CDDConfiguration, config } from "../src/runner/config.js";
import { EnvironmentManipulatorType } from "../src/types/EnvironmentManipulatorType.js";
import { CDDConfigurationTestData } from "./CDDConfigurationTestData.js";

export class ModuleResolutionSetter implements EnvironmentManipulatorType {
    oldconfig: CDDConfiguration = CDDConfigurationTestData["getCDDConfiguration"]()

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

export function getModuleResolutionSetter(): ModuleResolutionSetter {
    return new ModuleResolutionSetter(CDDConfigurationTestData["getCDDConfiguration"]());
}

export function getModuleResolutionSetterES(): ModuleResolutionSetter {
    return new ModuleResolutionSetter(CDDConfigurationTestData["getCDDConfigurationES"]());
}
export function getModuleResolutionSetterEsbuild(): ModuleResolutionSetter {
    return new ModuleResolutionSetter(CDDConfigurationTestData["getCDDConfigurationEsbuild"]());
}

