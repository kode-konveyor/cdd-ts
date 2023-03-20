import { CDDConfigurationTestData } from "../CDDConfiguration/CDDConfigurationTestData.js";
import { ModuleResolutionSetter } from "./ModuleResolutionSetter.js";

export function getModuleResolutionSetterES(): ModuleResolutionSetter {
    return new ModuleResolutionSetter(CDDConfigurationTestData["getCDDConfigurationES"]());
}
