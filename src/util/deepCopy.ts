export function deepCopy<T>(src: T): T {
  const target: T = (Array.isArray(src) ? [] : {}) as T;
  for (const key in src) {
    const v = src[key];
    if (typeof v === "object") {
      target[key] = deepCopy(v);
    } else {
      target[key] = v;
    }
  }
  return target;
}
