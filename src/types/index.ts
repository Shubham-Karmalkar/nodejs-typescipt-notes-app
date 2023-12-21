export type VoidFunc = (...args: any[]) => void;

export type Func<Type> = (...args: any[]) => Type;

export type AsyncFunc<Type> = (...args: any[]) => Promise<Type>;

export type KeysOf<Type> = keyof Type;

export type ValuesOf<Type> = Type[keyof Type];
