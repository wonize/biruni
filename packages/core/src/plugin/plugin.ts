import type { CoreContext } from '../context';
import type { StoreData } from '../globals';

export type ExactPlugin = <S extends StoreData>() => CoreContext<S>;

export type Plugin<TArguments extends ReadonlyArray<unknown> = [void]> = (
	...args: TArguments
) => ExactPlugin;
