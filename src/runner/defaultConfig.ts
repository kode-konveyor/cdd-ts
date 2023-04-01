import { CDDConfiguration } from "../types/CDDConfiguration";

export const defaultConfig: CDDConfiguration = {
    watch: false,
    distFiles: 'dist/**/*.js',
    contracts: 'contracts/**/*Contract.ts',
    jsDir: "dist",
    moduleResolution: "ES",
    debug: false
};
