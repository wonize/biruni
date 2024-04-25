import type { Parser, ParserContext, Plugin, StoreData } from '@biruni/core';

class JsonParser<S extends StoreData> implements Parser<S> {
	public parse<T extends S>(value: string): T {
		return JSON.parse(value);
	}

	public stringify<T extends S>(value: T): string {
		return JSON.stringify(value);
	}
}

const json: Plugin = () => {
	return function <S extends StoreData>(): ParserContext<S> {
		const $$instance = new JsonParser<S>();

		return {
			$$type: 'parser',
			$$instance: $$instance,
		};
	};
}

export default json;
export { json as JsonPlugin, json };
