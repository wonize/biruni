export type SetObject<V extends object> = Partial<V>;
export type SetFn<V extends object> = (draft?: V) => SetObject<V>;
export type SetFnByKey<V extends object, K extends keyof V> = (draft?: V[K]) => V[K];
export type SetObjectByKey<V extends object, K extends keyof V> = V[K];
