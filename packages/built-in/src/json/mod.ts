import type { Plugin } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import type { Parser } from '@biruni/core/parser';

class JsonParser<S extends StoreData> implements Parser<S> {
	public parse<T extends S>(value: string): T {
		return JSON.parse(value);
	}

	public stringify<T extends S>(value: T): string {
		return JSON.stringify(value);
	}
}

const json = (): Plugin.Function => {
	return function <Data extends StoreData>() {
		const $$instance = new JsonParser<Data>();
		return {
			$$type: 'parser',
			$$instance: $$instance,
		};
	};
}

export default json;
export { json as JsonPlugin, json };
