import type { Separator } from './separator';

type IndexOfArray<TArray extends ReadonlyArray<unknown>> = keyof {
	[K in keyof TArray as K extends `${infer I}`
		? I extends `${number}`
			? `${I}`
			: never
		: never]: unknown;
};

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
