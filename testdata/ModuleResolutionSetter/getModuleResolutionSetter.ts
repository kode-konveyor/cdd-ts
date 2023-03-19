import { getCDDConfiguration } from "../CDDConfiguration/getCDDConfiguration.js";
import { ModuleResolutionSetter } from "./ModuleResolutionSetter.js";

export function getModuleResolutionSetter(): ModuleResolutionSetter {
    return new ModuleResolutionSetter(getCDDConfiguration());
}
