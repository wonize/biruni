import type { ParserContext } from "./parser/context";
import type { PersisterContext } from "./persister/context";
import type { PluginStruct } from "./plugin/struct";

export class Core<V extends object> {
	public constructor(
		private initializer: () => V,
		private pluginStruct: PluginStruct<V>) {
		this.setByValue(this.initializer());
	}

	async set<TValue extends V>(value?: TValue): Promise<void>;
	async set<TValue extends V>(setter?: (draft: TValue) => TValue): Promise<void>;
	async set<TValue extends V>(valueOrSetter?: TValue | ((draft: TValue) => TValue)): Promise<void> {
		if (typeof valueOrSetter === 'function') {
			return this.setBySetter(valueOrSetter);
		}

		return this.setByValue(valueOrSetter);
	}

	private async setBySetter<TValue extends V>(setter?: (draft: TValue) => TValue): Promise<void> {
		return new Promise(async (resolve) => {
			const parser = this.pluginStruct?.parser as ParserContext<TValue>;
			if (typeof parser === 'undefined') throw 'should have least one parser';
			const stringified = parser.$$instance.stringify(setter({} as TValue));

			const persister = this.pluginStruct?.persister as PersisterContext<TValue>;
			if (typeof persister === 'undefined') throw 'should have least one persister';
			await persister.$$instance.set({ $$value: stringified });

			return resolve();
		});
	}

	private async setByValue<TValue extends V>(value?: TValue): Promise<void> {
		return new Promise(async (resolve) => {
			const parser = this.pluginStruct?.parser as ParserContext<TValue>;
			if (typeof parser === 'undefined') throw 'should have least one parser';
			const stringified = parser.$$instance.stringify(value);

			const persister = this.pluginStruct?.persister as PersisterContext<TValue>;
			if (typeof persister === 'undefined') throw 'should have least one persister';
			await persister.$$instance.set({ $$value: stringified });

			return resolve();
		});
	}

	async get<TValue extends V>(): Promise<TValue> {
		return new Promise(async (resolve) => {
			const persister = this.pluginStruct?.persister as PersisterContext<TValue>;
			if (typeof persister === 'undefined') throw 'should have least one persister';
			const raw_value = await persister.$$instance.get({});

			const parser = this.pluginStruct?.parser as ParserContext<TValue>;
			if (typeof parser === 'undefined') throw 'should have least one parser';
			const parsed = parser.$$instance.parse(raw_value.$$value);

			return resolve(parsed);
		});
	}
}
