export type ToPathKey<
	Data extends object,
	Sep extends Separator = '.',
> = keyof Data | (keyof {
	[
	K in keyof Data as Data[K] extends Array<unknown> ?
	`${string & K}${Sep}${number}` :
	Data[K] extends ReadonlyArray<unknown> ?
	`${string & K}${Sep}${string & IndexOfArray<Data[K]>}` :
	Data[K] extends object ?
	`${string & K}${Sep}${string & ToPathKey<Data[K], Sep>}` :
	`${string & K}`
	]: unknown;
});

type IndexOfArray<TArray extends ReadonlyArray<unknown>> = keyof {
	[K in keyof TArray as K extends `${infer I}` ? I extends `${number}` ? `${I}` : never : never]: unknown
}

export type ValueOfPathKey<
	Data extends object,
	Path extends ToPathKey<Data, Sep>,
	Sep extends Separator = '.',
> =
	Path extends keyof Data ? Data[Path] :
	Path extends `${infer Parent}${Sep}${infer Children}` ?
	// @ts-expect-error the Parent is actually index of Data
	ValueOfPathKey<Data[Parent], Children, Sep> :
	never;

export type Separator = string | '::' | ':' | '.' | '/' | ',' | '&' | '*' | '@';