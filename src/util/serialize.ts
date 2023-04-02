
export function serialize(object: any): string {
    return str("", {"": object},"",[]);// harmless mutation
}

const indent = " ";

// eslint-disable-next-line no-control-regex, no-misleading-character-class
const escapableRegEx = /[\u0000-\u0009\u000b-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
const meta: Record<string,string> = {
    "\t": "\\t",
    "\b": "\\b",
    "\f": "\\f",
    "\r": "\\r",
};

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

function str(key:string|number, holder:Record<string,unknown>, gap: string, seen: Array<Object>): string {
    const mind = gap;
    let partial: Array<unknown>;
    let value = holder[key];

    if (
        value != null &&
        typeof value === "object" &&
        "toJSON" in value &&
        typeof value.toJSON === "function"
    ) {
        value = value.toJSON(key);
    }

    if (value instanceof Error) {
        const error = {__class:"Error"};

        Object.getOwnPropertyNames(value).forEach(function (propName) {
            (error as unknown as Record<string,unknown>)[propName] = (value as Record<string,unknown>) [propName];
        });

        value = error;
    }

    switch (typeof value) {
        case "string":
            return quote(value);

        case "function": {
            if("displayName" in value) {
                return quote(value.displayName as string)
            }
            const consolidatedValue = quote(value.toString().replace(/[ \t\n]+/gs, " "));
            return consolidatedValue;
        }

        case "number":
            return (isFinite(value))
                ? String(value)
                : "INFINITY";

        case "object": {
            if(value === null)
                return "null"
            if (includes(seen, value)) {
                return "CIRCULAR OBJECT";
            }

            seen.push(value as Object);

            gap += indent;
            partial = [];

            for (const k of Object.keys(value as Object).sort()) {
                const v = str(k, value as unknown as Record<string,Object>, gap, seen);
                if (v != null) {
                    partial.push(quote(k) + ": " + v);
                }
            }

            const v = "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
            gap = mind;
            return v;
        }

    }
    return value as string
}

