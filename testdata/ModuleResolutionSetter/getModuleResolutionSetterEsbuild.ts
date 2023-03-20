import { CDDConfigurationTestData } from "../CDDConfiguration/CDDConfigurationTestData.js";
import { ModuleResolutionSetter } from "./ModuleResolutionSetter.js";

export function getModuleResolutionSetterEsbuild(): ModuleResolutionSetter {
    return new ModuleResolutionSetter(CDDConfigurationTestData["getCDDConfigurationEsbuild"]());
}
