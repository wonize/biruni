import type { ParserContext } from "./parser/context";
import type { PersisterContext } from "./persister/context";
import type { PluginStruct } from "./plugin/struct";
import type { SetterArg, ValueArg } from "./proxy";

export class Core<V extends object> {
	public constructor(
		private initializer: () => V,
		private pluginStruct: PluginStruct<V>) {
		this.setByValue(this.initializer());
	}

	async set(value: ValueArg<V>): Promise<void>;
	async set(setter: SetterArg<V>): Promise<void>;
	async set(valueOrSetter: ValueArg<V> | SetterArg<V>): Promise<void> {
		if (typeof valueOrSetter === 'function') {
			return this.setBySetter(valueOrSetter);
		} else {
			return this.setByValue(valueOrSetter);
		}
	}

	private async setBySetter(setter: SetterArg<V>): Promise<void> {
		return new Promise(async (resolve) => {
			const parser = this.pluginStruct?.parser as ParserContext<V>;
			if (typeof parser === 'undefined') throw 'should have least one parser';
			const stringified = parser.$$instance.stringify(setter({} as unknown as V) as unknown as V);

			const persister = this.pluginStruct?.persister as PersisterContext<V>;
			if (typeof persister === 'undefined') throw 'should have least one persister';
			await persister.$$instance.set({ $$value: stringified });

			return resolve();
		});
	}

	private async setByValue(value: ValueArg<V>): Promise<void> {
		return new Promise(async (resolve) => {
			const parser = this.pluginStruct?.parser as ParserContext<V>;
			if (typeof parser === 'undefined') throw 'should have least one parser';
			const stringified = parser.$$instance.stringify(value as unknown as V);

			const persister = this.pluginStruct?.persister as PersisterContext<V>;
			if (typeof persister === 'undefined') throw 'should have least one persister';
			await persister.$$instance.set({ $$value: stringified });

			return resolve();
		});
	}

	async get<K = undefined>(): Promise<V>;
	async get<K extends keyof V, R = V[K]>(key: K): Promise<R>;
	async get<
		K extends keyof V,
		P extends undefined | K = undefined,
		R = P extends K ? V[P] : V,
	>(prop?: P): Promise<R> {
		return new Promise(async (resolve) => {
			const persister = this.pluginStruct?.persister as PersisterContext<V>;
			if (typeof persister === 'undefined') throw 'should have least one persister';
			const raw_value = await persister.$$instance.get({});

			const parser = this.pluginStruct?.parser as ParserContext<V>;
			if (typeof parser === 'undefined') throw 'should have least one parser';
			const parsed = parser.$$instance.parse(raw_value.$$value);

			if (typeof prop === 'undefined')
				return resolve(parsed as unknown as never);
			else
				return resolve(parsed[prop] as unknown as never)
		});
	}
}
