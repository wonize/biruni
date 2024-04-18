export type ValueArg<V extends object> = Partial<V>;
export type SetterArg<V extends object> = (draft?: V) => ValueArg<V>;
