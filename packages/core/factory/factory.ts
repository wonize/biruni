import { Core } from "../core";
import type { PluginInner, PluginStruct } from "../plugin/mod";
import type { FactoryChain } from "./chain";

class CoreFactory<V extends object> implements FactoryChain<V> {
	readonly #pluginStruct: PluginStruct;
	public constructor(plugin?: PluginInner, comingPluginStruct?: PluginStruct) {
		const pluginStruct = comingPluginStruct ?? {
			validator: [],
			parser: [],
			persister: [],
		};

		if (typeof plugin !== 'function') return;
		const pluginContext = plugin();
		this.#pluginStruct = Object.assign({}, pluginStruct, {
			[pluginContext.$$type]: []
				.concat(pluginStruct?.[pluginContext.$$type] ?? [])
				.concat(pluginContext)
		}) satisfies PluginStruct;
	}

	public plug(plugin: PluginInner): FactoryChain<V> {
		return new CoreFactory<V>(plugin, this.#pluginStruct);
	}

	public init<TValue extends V>(initializer: () => TValue): Core<TValue> {
		return new Core<TValue>;
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
