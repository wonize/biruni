import type { CoreContext } from "../context";
import type { Parser } from "../parser/mod";
import type { Plugin } from "../plugin/mod";

export class NativeJsonParser<V extends object> implements Parser<V> {
	public parse<TValue extends V>(value: string): TValue {
		return JSON.parse(value);
	}

	public stringify<TValue extends V>(value: TValue): string {
		return JSON.stringify(value);
	}
}

const json: Plugin = () => function <V extends object>(): CoreContext<V> {
	const $$instance = new NativeJsonParser<V>;

	return {
		$$type: 'parser',
		$$instance: $$instance,
	}
}

export { json, json as NativeJsonPlugin };
