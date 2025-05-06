export type TypedSimpleChanges<Component extends object, Props = ExcludeFunctions<Component>> = {
  [Key in keyof Props]: {
    previousValue: Props[Key];
    currentValue: Props[Key];
    firstChange: boolean;
    isFirstChange(): boolean;
  }
};

type MarkFunctionPropertyNames<Component> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [Key in keyof Component]: Component[Key] extends Function ? never : Key;
};

type ExcludeFunctionPropertyNames<Type extends object> = MarkFunctionPropertyNames<Type>[keyof Type];

type ExcludeFunctions<Type extends object> = Pick<Type, ExcludeFunctionPropertyNames<Type>>;
