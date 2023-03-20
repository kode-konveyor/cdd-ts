
export function rewriter(key: string, value: any): any {
    if (typeof value === "function") {
        if(value.displayName !== undefined) {
            return value.displayName
        }
        const consolidatedValue = value.toString().replace(/[ \t\n]+/gs, " ");
        return consolidatedValue;
    }
    if (value instanceof Error) {
        const error = {__class:"Error"};

        Object.getOwnPropertyNames(value).forEach(function (propName) {
            (error as unknown as Record<string,unknown>)[propName] = (value as unknown as Record<string,unknown>) [propName];
        });

        return error;
    }
    return value;
}
