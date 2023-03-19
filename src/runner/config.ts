import { readFileSync } from "fs"

export interface CDDConfiguration {
    jsDir: string,
    moduleResolution: string
}
export const config: CDDConfiguration = JSON.parse(readFileSync("cdd-ts.json").toString())
