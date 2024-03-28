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

export type ReqData<Body = GenericObj, Params = GenericObj, Query = GenericObj, Headers = GenericObj> = {
  body: Body;
  params: Params;
  query: Query;
  headers: Headers;
  //eslint-disable-next-line no-undef
  // files?: Express.Multer.File[];
};
