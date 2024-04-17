import type { Core } from "../core";
import type { ExactPlugin } from "../plugin/plugin";

export interface FactoryChain<T extends object> {
	plug(plugin: ExactPlugin): FactoryChain<T>;
	init<TValue extends T>(initializer: () => TValue): Core<TValue>;
}
