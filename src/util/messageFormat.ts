
export function messageFormat (format: string, ...parameters:string[]) {
    if (parameters.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            format = format.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return format;
};

