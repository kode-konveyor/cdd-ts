import { CDDConfigurationTestData } from "../CDDConfiguration/CDDConfigurationTestData.js";
import { ModuleResolutionSetter } from "./ModuleResolutionSetter.js";

export function getModuleResolutionSetter(): ModuleResolutionSetter {
    return new ModuleResolutionSetter(CDDConfigurationTestData["getCDDConfiguration"]());
}
