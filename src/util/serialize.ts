import { rewriter } from "./rewriter.js";

interface JSONable {
    toJSON: (this: any, key?: string|number) => any
}

export function serialize(object: any): string {
    return str("", {"": object},"",[]);
}

// eslint-disable-next-line no-control-regex, no-misleading-character-class
const escapableRegEx = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

const indent = " ";
const meta:Record<string,string> = {    // table of character substitutions
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "\"": "\\\"",
    "\\": "\\\\"
} 



function quote(string:string): string {
    escapableRegEx.lastIndex = 0;
    return escapableRegEx.test(string)
        ? "\"" + string.replace(escapableRegEx, function (a) {
            const c = meta[a];
            return typeof c === "string"
                ? c
                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + "\""
        : "\"" + string + "\"";
}



function includes(array: Array<unknown>, value:unknown): boolean {
    for (const member of array) {
        if (value === member) {
            return true;
        }
    }
    return false;
}


function str(key:string|number, holder:Record<string,JSONable>, gap: string, seen: Array<unknown>): string {

    const mind = gap;
    let partial: Array<unknown>;
    let value:JSONable = holder[key];

    if (
        (Boolean(value))
        && typeof value === "object"
        && typeof value.toJSON === "function"
    ) {
        value = value.toJSON(key);
    }

        value = rewriter.call(holder, key, value);

    switch (typeof value) {
        case "string":
            return quote(value);

        case "number":
            return (isFinite(value))
                ? String(value)
                : "null";

        case "boolean":
            return String(value);

        case "object": {

            if (includes(seen, value)) {
                throw new TypeError("Converting circular structure to JSON");
            }

            seen.push(value);

            gap += indent;
            partial = [];

            for (const k of Object.keys(value).sort()) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                    const v = str(k, value as unknown as Record<string,JSONable>, gap, seen);
                    if (v != null) {
                        partial.push(quote(k) + (
                            (gap !== "")
                                ? ": "
                                : ":"
                        ) + v);
                    }
                }
            }

            const v = partial.length === 0
                ? "{}"
                : gap !== ""
                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                    : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }
}

