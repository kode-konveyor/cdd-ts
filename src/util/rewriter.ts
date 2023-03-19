export function rewriter(key: string, value: any): any {
    if (typeof value === "function") {
        const consolidatedValue = value.toString().replace(/[ \t]+/g, "");
        return consolidatedValue;
    }
    return value;
}
