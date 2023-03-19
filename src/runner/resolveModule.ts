import { relative, dirname } from "path";
import { config } from "./config.js";
import url from 'url';

const fileName = url.fileURLToPath(import.meta.url);
export const dirName = dirname(fileName);


export function resolveModule(contractFile: string): string {
    if(config.moduleResolution === 'ES') {
        return relative(dirName, config.jsDir) + '/' + contractFile.replace(".ts", ".js");
    }
    if(config.moduleResolution === 'esbuild') {
        const path = relative(dirName, config.jsDir) + '/' + contractFile.replace(".ts", ".cjs");
        return path;
    }
    return contractFile
}
