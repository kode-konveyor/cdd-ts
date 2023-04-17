import { diffLines } from "diff";
import colors from "colors";
import { BOLD, STRIKE_THROUGH, NEWLINE } from "./Constants.js";

export class DiffService {
  diff(expected: string, actual: string): string {
    const { enable } = colors;
    enable();
    return diffLines(expected, actual)
      .map((diff) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const color = diff.added
          ? BOLD
          : // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          diff.removed
          ? STRIKE_THROUGH
          : false;
        if (color === false) return diff.value;
        return (diff.value[color] as string).bgYellow;
      })
      .join(NEWLINE);
  }
}
