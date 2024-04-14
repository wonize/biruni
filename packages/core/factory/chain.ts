import type { Core } from "../core";
import type { PluginInner } from "../plugin/plugin";

export interface FactoryChain<T extends object> {
	plug(plugin: PluginInner): FactoryChain<T>;
	init<TValue extends T>(initializer: () => TValue): Core<TValue>;
}
