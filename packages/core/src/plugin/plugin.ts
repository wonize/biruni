import type { CoreContext } from '../context';

export type ExactPlugin = <T extends object>() => CoreContext<T>;

export type Plugin<TArguments extends ReadonlyArray<unknown> = [void]> = (
	...args: TArguments
) => ExactPlugin;
