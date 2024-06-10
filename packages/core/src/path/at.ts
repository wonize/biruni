import type { From } from './from';
import type { Separator } from './separator';

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
