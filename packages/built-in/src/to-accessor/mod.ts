import type { StoreData } from '@biruni/core/helpers';
import type { Core } from '@biruni/core/plugin/context';

type Accessors<Data extends object> = {
	[Key in keyof Data]: AccessorFunction<Data[Key]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-constraint
type AccessorFunction<Value extends any> = ((value?: Value) => Value) & {
	onchange(listener: (value: Value) => unknown): void;
};

function make_single_accessor<Data extends object, Key extends keyof Data>(data: Data, key: Key) {
	type Value = Data[Key];
	type Listener<V extends Value> = (value: V) => unknown;

	const accessor = (function () {
		const listeners = new Set<Listener<Value>>();

		function accessor(value?: Value) {
			if (typeof value !== 'undefined') {
				notify(value);
				// TODO: don't forget to use `immer` as immutable set
				data[key] = value;
			}
			return data[key];
		}

		accessor.onchange = function onchange_accessor(listener: Listener<Value>) {
			listeners.add(listener);
		};

		function notify(value: Value) {
			listeners.forEach(function map_listeners(listener) {
				listener(value);
			});
		}

		return accessor;
	})();

	return accessor;
}

function produce_from<Data extends object>(data: Data) {
	const actions: Accessors<Data> = {} as Accessors<Data>;
	for (const key in data) {
		actions[key] = make_single_accessor(data, key);
	}
	return actions;
}

// NOTE: the new plugin api's in progress :)
// NOTE: this below is work with future plugin api
function toAccessor() {
	return function plugin<Data extends StoreData>(self: Core<Data>, data: Data) {
		for (const key in data) {
			// FIXME: after implement `assign` api remove below comments
			// self.assign(key, make_single_accessor(data, key));
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(self as any)[key] = make_single_accessor(data, key);
		}
	};
}

export { produce_from, toAccessor };
