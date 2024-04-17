import type { ParserContext } from "./parser/context.js";
import type { PersisterContext } from "./persister/context.js";
import type { PluginStruct } from "./plugin/struct.js";

type ValueArg<V extends object> = Partial<V>;
type SetterArg<V extends object> = (draft?: V) => ValueArg<V>;

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
		}
		else {
			return this.setByValue(valueOrSetter);
		}
	}

	private async setBySetter(setter: SetterArg<V>): Promise<void> {
		return new Promise(async (resolve) => {
			const parser = this.pluginStruct?.parser as ParserContext<V>;
			if (typeof parser === 'undefined') throw 'should have least one parser';
			const stringified = parser.$$instance.stringify(setter({} as unknown as V));

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
			const stringified = parser.$$instance.stringify(value);

			const persister = this.pluginStruct?.persister as PersisterContext<V>;
			if (typeof persister === 'undefined') throw 'should have least one persister';
			await persister.$$instance.set({ $$value: stringified });

			return resolve();
		});
	}

	async get(): Promise<V> {
		return new Promise(async (resolve) => {
			const persister = this.pluginStruct?.persister as PersisterContext<V>;
			if (typeof persister === 'undefined') throw 'should have least one persister';
			const raw_value = await persister.$$instance.get({});

			const parser = this.pluginStruct?.parser as ParserContext<V>;
			if (typeof parser === 'undefined') throw 'should have least one parser';
			const parsed = parser.$$instance.parse(raw_value.$$value);

			return resolve(parsed);
		});
	}
}
