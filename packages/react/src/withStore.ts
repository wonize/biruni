import type { Core } from 'biruni';
import React, { Attributes, useMemo } from "react";
import { useStore } from './useStore';

function withStore<
	D extends object,
	P extends object,
	S extends Core<D>,
	V = S extends Core<infer T> ? T : object,
	O = Omit<P, keyof V>,
	G = O & V,
>(Store: S, Component: React.ComponentType<P & Partial<G>>) {
	return function EnhancedBiruni<Props extends object & O & Partial<V>>(props: Props) {
		const store = useStore(Store);
		const storeProps = useMemo(() => store.get(), [store]);

		return (
			React.createElement(
				Component,
				Object.assign({}, props, storeProps) as Props & P & G
			)
		)
	}
}

export { withStore as withBiruni, withStore };

export type WithStore<
	S extends Core<object>,
	P extends object = object
> = S extends Core<infer T>
	? Omit<P, keyof T> & Partial<T>
	: P;
