import type { CoreContext } from "../context";

export type PluginInner = <T extends object>() => CoreContext<T>;

export type Plugin<TArguments extends ReadonlyArray<unknown> = [void]> = (...args: TArguments) => PluginInner;
