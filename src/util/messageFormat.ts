export function messageFormat(
  format: string,
  ...parameters: [string, ...Array<unknown>] | [Record<string, any>]
): string {
  const t = typeof parameters[0];
  const args =
    t === "string"
      ? (Array.prototype.slice.call(arguments) as unknown as Record<
          string,
          any
        >)
      : (parameters[0] as Record<string, string>);
  for (const key in args) {
    format = format.replace(
      new RegExp("\\{" + key + "\\}", "gi"),
      String(args[key])
    );
  }

  return format;
}
