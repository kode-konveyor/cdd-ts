export function boundCall<T>(
  ServiceClass: new () => any,
  methodName?: string
): T {
  const instance = new ServiceClass();
  if (methodName === undefined) {
    const className = ServiceClass.name;
    const classNameLowercased =
      (className[0] as string).toLowerCase() + className.slice(1);

    methodName = classNameLowercased.substring(
      0,
      classNameLowercased.length - "Service".length
    );
  }
  const method = instance[methodName];

  return method.call.bind(method);
}
