import cloneDeep from 'lodash.clonedeep';
import { Boundary } from './boundary';
import { DataFlow } from './flow';
import type { DataObject } from './helpers/type-utility';
import type { Plugin } from './plugin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any[]) => any;

class Core<Data extends DataObject, Namespace extends string = string> {
	public constructor(namespace: Namespace) {
		this.#namespace = namespace;
		this.plugins = new Map();
		this.boundary = new Boundary();
		this.internal = new Map();
		this.hooks = new Map();
	}

	#namespace: Namespace;
	public get namespace(): Namespace {
		return this.#namespace;
	}
	public set namespace(namespace: Namespace) {
		this.#namespace = namespace;
	}

	private boundary: Boundary;
	public bound(name: string, value: unknown) {
		return this.boundary.inject(name, value);
	}

	private internal: Map<string, Fn>;
	public register<N extends string, F extends Fn>(name: N, fn: F): Record<N, F> {
		this.internal.set(name, fn);
		return { [name]: fn } as Record<N, F>;
	}
	public invoke<R>(name: string, ...args: unknown[]): R {
		if (name in this.internal) {
			const internal = this.internal.get(name) as NonNullable<Fn>;
			return internal(...args);
		}

		throw new Error(`The "${name}" internal not exists!`);
	}

	private hooks: Map<DataFlow | string, Set<Fn>>;
	public watch(name: DataFlow | string, fn: Fn) {
		const hooks = new Set(this.hooks.get(name));
		hooks.add(fn);
		this.hooks.set(name, hooks);
		return { [name]: fn };
	}
	public trigger(name: DataFlow | string, ...args: unknown[]) {
		return this.hooks.get(name)?.forEach(function map_hooks(hook) {
			return hook(...args);
		});
	}

	private plugins: Map<string, Plugin<Data>>;
	public plug(plugin: Plugin<Data>) {
		plugin.setup(this);
		this.plugins.set(plugin.name, plugin);
	}

	public process<Return>(flow: DataFlow, fn: (data: Data) => Return) {
		const plugins = Array.from(this.plugins.values()).filter(
			function filter_plugin_by_flow(plugin) {
				return plugin.flow === flow;
			}
		);

		this.trigger(flow, this.data);

		if (flow === DataFlow.INPUT) {
			const data = fn(this.data);
			this.data = plugins.reduceRight(
				function produce(res, plugin) {
					return plugin.process(res);
				},
				data as unknown as Data
			);
			return this.data;
		} else if (flow === DataFlow.OUTPUT) {
			const data = plugins.reduce(
				function produce(res, plugin) {
					return plugin.process(res);
				},
				this.data as unknown as Data
			);
			const output = fn(data) as unknown as Data;
			return output;
		}

		return this.data;
	}

	#data!: Data;
	private get data(): Data {
		return cloneDeep(this.#data);
	}
	private set data(data: Data) {
		this.#data = data;
	}

	public initBy<D extends Data>(initialize: () => D) {
		// TODO: implement fresh-initializing
		/* function fresh(persisted_data) {
			const comming_data = initializer();
			const data = mergeFresh<Readonly<Data>>(persisted_data, comming_data);
			this.setByEntire(data);
		} */

		this.data = initialize();
		return this.boundary.eject();
	}
}

export { Core };
