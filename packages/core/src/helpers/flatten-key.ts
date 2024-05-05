export type ToFlatKey<Data extends object> = keyof Data | (keyof {
	[
	K in keyof Data as Data[K] extends Array<unknown> ?
	`${string & K}.${number}` :
	Data[K] extends ReadonlyArray<unknown> ?
	`${string & K}.${string & IndexOfArray<Data[K]>}` :
	Data[K] extends object ?
	`${string & K}.${string & ToFlatKey<Data[K]>}` :
	`${string & K}`
	]: unknown;
});

type IndexOfArray<TArray extends ReadonlyArray<unknown>> = keyof {
	[K in keyof TArray as K extends `${infer I}` ? I extends `${number}` ? `${I}` : never : never]: unknown
}

export type ValueOfFlatKey<Data extends object, Key extends string> =
	Key extends keyof Data ? Data[Key] :
	Key extends `${infer Parent}.${infer Children}` ?
	// @ts-expect-error the Parent is actually index of Data
	ValueOfFlatKey<Data[Parent], Children> :
	never;
