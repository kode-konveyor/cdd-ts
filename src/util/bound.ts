export function bound<T>(ServiceClass: new () => any): T {
  const instance = new ServiceClass();
  const className = ServiceClass.name;
  const classNameLowercased =
    (className[0] as string).toLowerCase() + className.slice(1);
  const methodName = classNameLowercased.substring(
    0,
    classNameLowercased.length - "Service".length
  );
  const method = instance[methodName];

  return method.bind(instance);
}
