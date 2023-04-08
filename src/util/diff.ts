import { diffLines } from "diff";
import colors from "colors";

const { enable } = colors;

enable();

const BOLD = "bold";
const STRIKE_THROUGH = "strikethrough";
const GREY = "grey";
const NEWLINE = "\n";
export function diff(expected: string, actual: string): string {
  return diffLines(expected, actual)
    .map((diff) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const color = diff.added
        ? BOLD
        : // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        diff.removed
        ? STRIKE_THROUGH
        : GREY;
      if (color === GREY) return diff.value;
      return (diff.value[color] as string).bgYellow;
    })
    .join(NEWLINE);
}
