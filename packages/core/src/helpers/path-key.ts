type IndexOfArray<TArray extends ReadonlyArray<unknown>> = keyof {
	[K in keyof TArray as K extends `${infer I}`
		? I extends `${number}`
			? `${I}`
			: never
		: never]: unknown;
};

export type At<
	Data extends object,
	Path extends From<Data, Sep>,
	Sep extends Separator = '.',
> = Path extends keyof Data
	? Data[Path]
	: Path extends `${infer Parent}${Sep}${infer Children}`
		? // @ts-expect-error the Parent is actually index of Data
			At<Data[Parent], Children, Sep>
		: never;

export type From<Data extends object, Sep extends Separator = '.'> =
	| keyof Data
	| keyof {
			[K in keyof Data as Data[K] extends unknown[]
				? `${string & K}${Sep}${number}`
				: Data[K] extends ReadonlyArray<unknown>
					? `${string & K}${Sep}${string & IndexOfArray<Data[K]>}`
					: Data[K] extends object
						? `${string & K}${Sep}${string & From<Data[K], Sep>}`
						: `${string & K}`]: unknown;
	  };

export type Separator = string | '::' | ':' | '.' | '/' | ',' | '&' | '*' | '@';
