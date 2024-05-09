import type { StoreData } from '../helpers/mod.ts';

import type { SetByKeySetter } from './by-key-setter.ts';
import type { SetByKeyValue } from './by-key-value.ts';
import type { SetByPair } from './by-pair.ts';
import type { SetBySetter } from './by-setter.ts';

interface SetOverloads<Data extends StoreData>
	extends SetByPair<Data>,
		SetByKeyValue<Data>,
		SetByKeySetter<Data>,
		SetBySetter<Data> {}

export type { SetOverloads };
