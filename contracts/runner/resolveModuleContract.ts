import { Contract } from "../../src/contract/Contract.js";
import { ResolveModuleService } from "../../src/runner/ResolveModuleService.js";
import { CDDConfigurationTestData } from "../../testdata/CDDConfigurationTestData.js";
import { ModuleNameTestData } from "../../testdata/ModuleNameTestData.js";

export const resolveModuleContractParties = [
  new ResolveModuleService().resolveModule,
];
export const resolveModuleContract = new Contract<
  typeof ResolveModuleService.prototype.resolveModule
>()
  .setTitle("resolves the module from name")
  .ifCalledWith(
    CDDConfigurationTestData.getCDDConfiguration,
    ModuleNameTestData.default
  )
  .thenReturn("it returns the input", ModuleNameTestData.default)
  .ifCalledWith(
    CDDConfigurationTestData.getCDDConfigurationES,
    ModuleNameTestData.default
  )
  .thenReturn(
    "The js file relative to resolveModule, with a '.js' in end",
    ModuleNameTestData.ES
  )
  .ifCalledWith(
    CDDConfigurationTestData.getCDDConfigurationEsbuild,
    ModuleNameTestData.default
  )
  .thenReturn(
    "The place where the defauil esbuild puts it",
    ModuleNameTestData.Esbuild
  );
