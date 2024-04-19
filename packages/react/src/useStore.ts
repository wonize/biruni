import type { Core } from '@biruni/core';
import React from 'react';

function useStore<V extends object>(store: Core<V>) {
	const [value, setValue] = React.useState<V>();

	React.useEffect(() => {
		store.get().then((value) => {
			setValue(() => value)
		})
	}, [store.get]);

	const $$store = React.useMemo(() => ({
		set: function (setter: V | ((d?: V) => V)) {
			store.set(setter as any)
		},
		get: function <
			K extends keyof V,
			P extends undefined | K = undefined,
			R = P extends K ? V[P] : V,
		>(property?: P): R {
			if (typeof value === 'undefined') return {} as unknown as never;

			if (typeof property === 'undefined') {
				return value as unknown as never;
			} else {
				return value[property] as unknown as never;
			}
		}
	}), [value]);

	return $$store;
}

export { useStore as useBiruni, useStore };

