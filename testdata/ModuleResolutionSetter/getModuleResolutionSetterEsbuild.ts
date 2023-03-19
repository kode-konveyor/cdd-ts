import { getCDDConfigurationEsbuild } from "../CDDConfiguration/getCDDConfigurationEsbuild.js";
import { ModuleResolutionSetter } from "./ModuleResolutionSetter.js";

export function getModuleResolutionSetterEsbuild(): ModuleResolutionSetter {
    return new ModuleResolutionSetter(getCDDConfigurationEsbuild());
}
