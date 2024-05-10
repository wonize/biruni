import type * as Context from '../context';
import type { StoreData } from '../helpers/mod';
import type * as Listener from '../listener/mod';

interface PluginInterface<Data extends StoreData> {
	readonly type: Context.ContextType;
	readonly name: string;
	beforeSet: (data: Data) => Promise<Data>;
	afterSet: (data: Data) => Promise<Data>;
	beforeGet: (data: Data) => Promise<Data>;
	afterGet: (data: Data) => Promise<Data>;
	beforeInitialize: (data: Data) => Promise<Data>;
	afterInitialize: (data: Data) => Promise<Data>;
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

	beforeSet: (data: Data) => Promise<Data> = async (data) => data;
	afterSet: (data: Data) => Promise<Data> = async (data) => data;
	beforeGet: (data: Data) => Promise<Data> = async (data) => data;
	beforeInitialize: (data: Data) => Promise<Data> = async (data) => data;
	afterInitialize: (data: Data) => Promise<Data> = async (data) => data;
	afterGet: (data: Data) => Promise<Data> = async (data) => data;

	addListener?: Listener.Add<Data>;
	removeListener?: Listener.Remove<Data>;
}

interface PluginFunction {
	<Data extends StoreData>(): BiruniPlugin<Data>;
}

export type { PluginFunction, PluginInterface };
