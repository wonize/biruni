// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EmptyObject {}
export const isEmptyObject = (obj: object): obj is EmptyObject => {
	return Object.keys(obj ?? {}).length === 0;
};
