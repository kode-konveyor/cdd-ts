import { rewriter } from "./rewriter.js";

export function serialize(object: any): string {
    return JSON.stringify(object, rewriter, 1);
}
