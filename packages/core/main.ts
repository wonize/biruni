import type { CoreChain } from "./chain";
import type { CoreContext } from "./context";

class Core<T extends object> implements CoreChain<T> {
	public plug(handler: <T extends object>() => CoreContext<T>): CoreChain<T> {
		return this;
	}

	public init<TValue extends T>(initializer: () => TValue): void {
		return;
	}
}

function core_factory<TValue extends object>(): CoreChain<TValue> {
	return new Core<TValue>();
}

export {
	Core as Biruni,
	Core as BiruniCore,
	core_factory as biruni,
	core_factory as defineKey
};

