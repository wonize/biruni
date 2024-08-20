import type { DataObject } from '@biruni/core/helpers/type-utility';
import type { SetByKeySetter } from './by-key-setter';
import type { SetByKeyValue } from './by-key-value';
import type { SetByPair } from './by-pair';
import type { SetBySetter } from './by-setter';
import type { SetOverloads } from './overloads';

export interface SetInterface<Data extends DataObject> {
	set: SetOverloads<Data>;
	setByPair: SetByPair<Data>;
	setByKeyValue: SetByKeyValue<Data>;
	setByKeySetter: SetByKeySetter<Data>;
	setBySetter: SetBySetter<Data>;
}
