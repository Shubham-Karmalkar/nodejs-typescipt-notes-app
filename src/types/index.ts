export type VoidFunc = (...args: any[]) => void;

export type Func<Type, rType = any> = (args: Type) => rType;

export type AsyncFunc<Type> = (...args: any[]) => Promise<Type>;

export type KeysOf<Type> = keyof Type;

export type ValuesOf<Type> = Type[keyof Type];

//Objects
export type GenericObj<Type = any> = {
  [prop: string]: Type;
};

export type HasPropOf<Type extends GenericObj> = {
  [Property in keyof Type]: any;
};
