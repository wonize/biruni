import { keyOf } from './keyOf';
import type { StoreData } from './type-utility';

const isObject = (input: unknown): input is object => {
	return (
		typeof input === 'object' &&
		input !== null &&
		(!(input instanceof Array) || Array.isArray(input) === false)
	);
};
const o = <TReturn extends object>(...objects: object[]): TReturn => Object.assign({}, ...objects);
const hasOwn = Object.hasOwn;

function mergeFresh<TData extends StoreData>(source: object, target: object): TData {
	const $source = o(source);
	const $target = o(target);
	let $result = o<TData>($source);
	const keysOfResult = keyOf($result);
	const keysOfTarget = keyOf($target);

	if (keysOfTarget.length === 0) {
		return $result;
	}

	keysOfResult.forEach((key) => {
		if (hasOwn($target, key) === false) {
			delete $result[key];
			$result = o($result);
		} else if (isObject($result[key])) {
			const $target_value = $target[key as keyof object];
			if (isObject($target_value)) {
				$result = o($result, {
					[key]: mergeFresh($result[key] as object, $target_value),
				});
			} else {
				$result = o($result, {
					[key]: $target_value,
				});
			}
		} else {
			const $target_value = $target[key as keyof object];
			if (isObject($target_value)) {
				$result = o($result, {
					[key]: $target_value,
				});
			} else {
				$result = o($result, {
					[key]: $result[key],
				});
			}
		}
	});

	keysOfTarget.forEach((key) => {
		if (hasOwn($result, key) === true) {
			return;
		}
		$result = o($result, { [key]: $target[key] });
	});

	return $result;
}

export { mergeFresh };
