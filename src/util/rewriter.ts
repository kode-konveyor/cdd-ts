export function rewriter(key: string, value: any): any {
    if (typeof value === "function") {
        if(value.displayName !== undefined) {
            return value.displayName
        }
        const consolidatedValue = value.toString().replace(/[ \t\n]+/gs, " ");
        return consolidatedValue;
    }
    return value;
}
