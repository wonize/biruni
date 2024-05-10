import { setProperty } from 'dot-prop';
import { clone, type StoreData } from '../helpers/mod';
import type * as Path from '../helpers/path-key';

interface ByPathValue<Data extends StoreData> {
	<TPath extends Path.From<Data>, Value extends Path.At<Data, TPath>>(
		path: TPath,
		value: Value
	): Promise<void>;
}

const isByPath = <Data extends StoreData>(input: unknown): input is Path.From<Data> => {
	return typeof input === 'string' && input.indexOf('.') !== -1;
};

function setByPath<
	TData extends StoreData,
	TPath extends Path.From<NoInfer<TData>, NoInfer<TSep>>,
	TValue extends Path.At<NoInfer<TData>, NoInfer<TPath>, NoInfer<TSep>>,
	TSep extends Path.Separator = '.',
>(data: TData, path: TPath, value: TValue, separator?: TSep): TData {
	const $data = clone(data);
	const $path = separator
		? path.toString().replace(RegExp(separator, 'g'), '.')
		: path.toString();
	return clone(setProperty($data, $path, value));
}

export { isByPath, setByPath };
export type { ByPathValue };
