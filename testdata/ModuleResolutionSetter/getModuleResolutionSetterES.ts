import { getCDDConfigurationES } from "../CDDConfiguration/getCDDConfigurationES.js";
import { ModuleResolutionSetter } from "./ModuleResolutionSetter.js";

export function getModuleResolutionSetterES(): ModuleResolutionSetter {
    return new ModuleResolutionSetter(getCDDConfigurationES());
}
