import type { CoreContext } from '../context';
import type { StoreData } from '../helpers';

export type ExactPlugin = <TData extends StoreData>() => CoreContext<TData>;

export type Plugin<TArguments extends ReadonlyArray<unknown> = [void]> = (
	...args: TArguments
) => ExactPlugin;
