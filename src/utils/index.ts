export const invokeFilteredUndefinedParam = <T extends (...args: unknown[]) => any>(
  fn: T,
  ...value: any[]
) => {
  if (value.length === 0) return fn();
  return fn(value.filter((v) => v !== undefined) as Parameters<T>);
};
