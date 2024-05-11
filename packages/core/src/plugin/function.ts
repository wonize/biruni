import type { StoreData } from '../helpers/mod';
import type * as Listener from '../listener/mod';
import type * as Context from './context';

interface PluginInterface<Data extends StoreData> {
	readonly type: Context.ContextType;
	readonly name: string;
	preprocess: (data: Data) => Promise<Data>;
	postprocess: (data: Data) => Promise<Data>;
}

export abstract class BiruniPlugin<Data extends StoreData> implements PluginInterface<Data> {
	abstract readonly type: Context.ContextType;
	abstract readonly name: string;

	get namespace() {
		return this._namespace;
	}
	set namespace(namespace) {
		this._namespace = namespace;
	}

	constructor(protected _namespace?: string) {}

	preprocess: (data: Data) => Promise<Data> = async (data) => {
		return data;
	};

	postprocess: (data: Data) => Promise<Data> = async (data) => {
		return data;
	};

	addListener?: Listener.Add<Data>;
	removeListener?: Listener.Remove<Data>;
}

interface PluginFunction {
	<Data extends StoreData>(): BiruniPlugin<Data>;
}

export type { PluginFunction, PluginInterface };
