import { Core } from "../core";
import type { ExactPlugin, PluginStruct } from "../plugin/mod";
import type { FactoryChain } from "./chain";

class CoreFactory<V extends object> implements FactoryChain<V> {
	readonly #pluginStruct: PluginStruct<V>;
	public constructor(plugin?: ExactPlugin, comingPluginStruct?: PluginStruct<V>) {
		const pluginStruct = comingPluginStruct ?? {
			validator: {},
			parser: {},
			persister: {},
		};

		if (typeof plugin !== 'function') return;
		const pluginContext = plugin();
		this.#pluginStruct = Object.assign({}, pluginStruct, {
			[pluginContext.$$type]: pluginContext
		}) as PluginStruct<V>;
	}

	public plug(plugin: ExactPlugin): FactoryChain<V> {
		return new CoreFactory<V>(plugin, this.#pluginStruct);
	}

	public init<TValue extends V>(initializer: () => TValue): Core<TValue> {
		return new Core<TValue>(initializer, this.#pluginStruct);
	}
}

function defineBiruni<TValue extends object>(): FactoryChain<TValue> {
	return new CoreFactory<TValue>();
}

export {
	CoreFactory as Biruni,
	CoreFactory as BiruniFactory,
	defineBiruni as biruni,
	defineBiruni as defineKey
};