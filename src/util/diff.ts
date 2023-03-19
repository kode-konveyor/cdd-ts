import { diffLines } from "diff";
import colors from "colors"

const { enable } = colors

enable()

export function diff(expected: string, actual: string): string {

    return diffLines(expected, actual).map(diff => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const color = diff.added ? "bold" :
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            diff.removed ? "strikethrough" : "grey";
        if (color === "grey")
            return diff.value;
        return (diff.value[color] as string).bgYellow;
    }
    )
        .join("\n");
}
