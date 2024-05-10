import type { StoreData } from '../helpers/mod';

import type { SetByKeySetter } from './by-key-setter';
import type { SetByKeyValue } from './by-key-value';
import type { SetByPair } from './by-pair';
import type { SetBySetter } from './by-setter';

interface SetOverloads<Data extends StoreData>
	extends SetByPair<Data>,
		SetByKeyValue<Data>,
		SetByKeySetter<Data>,
		SetBySetter<Data> {}

export type { SetOverloads };
