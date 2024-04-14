import { Fn } from "../chain";
import type { ParserContext, ParserCore } from "../parser";

export class NativeJsonParser<V extends object> implements ParserCore<V> {
	public parse<TValue extends V>(value: string): TValue {
		return JSON.parse(value);
	}

	public stringify<TValue extends V>(value: TValue): string {
		return JSON.stringify(value);
	}
}

function JsJsonPlugin<V extends object>(): Fn<ParserContext<V>> {
	const $$instance = new NativeJsonParser<V>;
	return function () {
		return {
			$$type: 'parser',
			$$instance,
		}
	}
}

export { JsJsonPlugin, JsJsonPlugin as json };
