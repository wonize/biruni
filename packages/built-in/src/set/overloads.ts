import type { DataObject } from '@biruni/core/helpers/mod';

import type { SetByKeySetter } from './by-key-setter';
import type { SetByKeyValue } from './by-key-value';
import type { SetByPair } from './by-pair';
import type { SetBySetter } from './by-setter';

interface SetOverloads<Data extends DataObject>
	extends SetByPair<Data>,
		SetByKeyValue<Data>,
		SetByKeySetter<Data>,
		SetBySetter<Data> {}

export type { SetOverloads };
