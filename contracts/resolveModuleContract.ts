import { Contract } from "../src/contract/Contract.js";
import { resolveModule } from "../src/runner/resolveModule.js";
import { CDDConfigurationTestData } from "../testdata/CDDConfigurationTestData.js";
import { getModuleName, getModuleNameES, getModuleNameEsbuild } from "../testdata/ModuleNameTestData.js";

export const resolveModuleContractParties = [resolveModule]
export const resolveModuleContract = new Contract<typeof resolveModule>()
    .setTitle("resolves the module from name")
    .ifCalledWith(CDDConfigurationTestData.getCDDConfiguration,getModuleName)
    .thenReturn("it returns the input", getModuleName)
    .ifCalledWith(CDDConfigurationTestData.getCDDConfigurationES, getModuleName)
    .thenReturn("The js file relative to resolveModule, with a '.js' in end", getModuleNameES)
    .ifCalledWith(CDDConfigurationTestData.getCDDConfigurationEsbuild, getModuleName)
    .thenReturn("The place where the defauil esbuild puts it", getModuleNameEsbuild)
