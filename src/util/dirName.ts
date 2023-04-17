// eslint-disable-next-line kodekonveyor/no-comment
/* Stryker disable all */
import { dirname } from "path";
import url from "url";

let fileName;
if (import.meta?.url !== undefined) {
  fileName = url.fileURLToPath(import.meta.url);
} else {
  fileName = __filename;
}
export const dirName = dirname(fileName);
