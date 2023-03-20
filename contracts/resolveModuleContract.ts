import { Contract } from "../src/contract/Contract.js";
import { resolveModule } from "../src/runner/resolveModule.js";
import { getModuleName, getModuleNameES, getModuleNameEsbuild } from "../testdata/ModuleNameTestData.js";
import { getModuleResolutionSetter, getModuleResolutionSetterES, getModuleResolutionSetterEsbuild } from "../testdata/ModuleResolutionSetterTestData.js";


export const resolveModuleContractParties = [resolveModule]
export const resolveModuleContract = new Contract<typeof resolveModule>()
    .setTitle("resolves the module from name")
    .when("no meaningful module resolution is defined",getModuleResolutionSetter())
    .ifCalledWith(getModuleName)
    .thenReturn("it returns the input", getModuleName)
    .when("module resolution is set to ES",getModuleResolutionSetterES())
    .ifCalledWith(getModuleName)
    .thenReturn("The js file relative to resolveModule, with a '.js' in end", getModuleNameES)
    .when("module resolution is set to esbuild",getModuleResolutionSetterEsbuild())
    .ifCalledWith(getModuleName)
    .thenReturn("The place where the defauil esbuild puts it", getModuleNameEsbuild)
