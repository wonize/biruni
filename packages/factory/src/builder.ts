import type { Context, Listener } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import type { BiruniPlugin } from '@biruni/core/plugin';

class PluginBuilder<Data extends StoreData> {
	public constructor(private name: string) {}

	#preprocess!: (data: Data) => Promise<Data>;
	public withPreProcess(preprocess: (data: Data) => Promise<Data>) {
		this.#preprocess = preprocess;
		return this;
	}

	#postprocess!: (data: Data) => Promise<Data>;
	public withPostProcess(postprocess: (data: Data) => Promise<Data>) {
		this.#postprocess = postprocess;
		return this;
	}

	#type!: Context.ContextType;
	public withType(type: Context.ContextType) {
		this.#type = type;
		return this;
	}

	#add_listener!: Listener.Add<Data>;
	public withAddListener(add_listener: Listener.Add<Data>) {
		this.#add_listener = add_listener;
		return this;
	}

	#remove_listener!: Listener.Remove<Data>;
	public withRemoveListener(remove_listener: Listener.Remove<Data>) {
		this.#remove_listener = remove_listener;
		return this;
	}

	public make(): BiruniPlugin<Data> {
		return {
			type: this.#type,
			name: this.name,
			preprocess: this.#preprocess,
			postprocess: this.#postprocess,
			addListener: this.#add_listener ?? undefined,
			removeListener: this.#remove_listener ?? undefined,

			_namespace: '',
			get namespace() {
				// @ts-expect-error the `_namespace` mock implemented
				return this._namespace;
			},
			set namespace(namespace) {
				// @ts-expect-error the `_namespace` mock implemented
				this._namespace = namespace;
			},
		} as unknown as BiruniPlugin<Data>;
	}
}

function createPlugin<Data extends StoreData>(name: string) {
	return new PluginBuilder<Data>(name);
}

export { PluginBuilder, createPlugin, createPlugin as makePlugin };
