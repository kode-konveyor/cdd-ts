export class BoundService {
  bound<T>(
    ServiceClass: new (...args: Array<any>) => any,
    ...parameters: Array<any>
  ): T {
    const instance = new ServiceClass(...parameters);
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
}
