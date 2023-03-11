
export function messageFormat (format: string, ...parameters:string[]): string {
    if (parameters.length > 0) {
        const t = typeof arguments[0];
        let key;
        const args = (t === "string" || t === "number") ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            format = format.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return format;
};

