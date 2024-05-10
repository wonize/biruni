import type { RemoveNever, StoreData } from '../helpers/type-utility.ts';

export function diff<Source extends Data, Target extends Data, Data extends any = StoreData>(
	source_data: Source,
	target_data: Target
): Diff<Source, Target, Data> {
	let diff_data = {};
	let diff_keys: Array<unknown> = [];
	for (let key in target_data) {
		// @ts-expect-error the keyof `target_data` and `source_data` will be same
		const source_value = source_data?.[key];
		const target_value = target_data[key];
		if (source_value !== target_value) {
			diff_data = Object.assign({}, diff_data, {
				[key]: {
					source: source_value,
					target: target_value,
				},
			});
			diff_keys = diff_keys.concat(key);
		}
	}

	return {
		source: source_data,
		target: target_data,
		keys: diff_keys as Array<keyof DiffData<Source, Target, Data>>,
		diff: diff_data as DiffData<Source, Target, Data>,
	};
}

type DiffData<
	Source extends Data,
	Target extends Data,
	Data extends any = StoreData,
> = RemoveNever<{
	[P in keyof Data]: Source[P] extends Target[P]
		? never
		: { source: Source[P]; target: Target[P] };
}>;

interface Diff<Source extends Data, Target extends Data, Data extends any = StoreData> {
	diff: DiffData<Source, Target, Data>;
	keys: Array<keyof DiffData<Source, Target, Data>>;
	source: Source;
	target: Target;
}

export type { Diff, DiffData };
