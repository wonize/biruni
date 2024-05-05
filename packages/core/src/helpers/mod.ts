export { hasOwn } from './hasOwn';
export { keyOf } from './keyOf';
export { mergeFresh } from './merge';
export type * from './type-utility';

export function shouldFreshInitializing(source: object, target: object): boolean {
	return JSON.stringify({ input: source }) !== JSON.stringify({ input: target });
}

interface EmptyObject { }
export const isEmptyObject = (obj: object): obj is EmptyObject => {
	return Object.keys(obj ?? {}).length === 0;
}