import { getProperty } from 'dot-prop';
import { clone, type StoreData } from '../helpers/mod';
import type * as Path from '../helpers/path-key';

interface ByPathValue<Data extends StoreData> {
	<TPath extends Path.From<Data>>(path: TPath): Promise<Path.At<Data, NoInfer<TPath>>>;
}

const isByPath = <Data extends StoreData>(input: unknown): input is Path.From<Data> => {
	return typeof input === 'string' && input.indexOf('.') !== -1;
};

function getByPath<
	TData extends StoreData,
	TPath extends Path.From<NoInfer<TData>, NoInfer<TSep>>,
	TValue extends Path.At<NoInfer<TData>, NoInfer<TPath>, NoInfer<TSep>>,
	TSep extends Path.Separator = '.',
>(data: TData, path: TPath, separator?: TSep): TValue {
	const $data = clone(data);
	const $path = separator
		? path.toString().replace(RegExp(separator, 'g'), '.')
		: path.toString();

	// @ts-expect-error no return null. checked by types
	return getProperty($data, $path);
}

export { getByPath, isByPath };
export type { ByPathValue };
