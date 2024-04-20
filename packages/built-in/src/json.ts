import type { CoreContext, Parser, Plugin } from '@biruni/core';

export class NativeJsonParser<V extends object> implements Parser<V> {
	public parse<TValue extends V>(value: string): TValue {
		return JSON.parse(value);
	}

	public stringify<TValue extends V>(value: TValue): string {
		return JSON.stringify(value);
	}
}

const json: Plugin = () =>
	function <V extends object>(): CoreContext<V> {
		const $$instance = new NativeJsonParser<V>();

		return {
			$$type: 'parser',
			$$instance: $$instance,
		};
	};

export { json as NativeJsonPlugin, json };
