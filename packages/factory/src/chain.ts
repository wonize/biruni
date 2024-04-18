import type { Core, ExactPlugin } from "@biruni/core";

export interface FactoryChain<T extends object> {
	plug(plugin: ExactPlugin): FactoryChain<T>;
	init<TValue extends T>(initializer: () => TValue): Core<TValue>;
}
