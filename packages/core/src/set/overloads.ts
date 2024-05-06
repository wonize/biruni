import type { StoreData } from "../helpers/mod.ts";

import type { KeySetter } from './by-key-setter.ts';
import type { KeyValue } from './by-key-value.ts';
import type { PartialData } from './by-partial.ts';
import type { Setter } from './by-setter.ts';

interface Overloads<Data extends StoreData> extends
	PartialData<Data>,
	KeyValue<Data>,
	KeySetter<Data>,
	Setter<Data> { }

export type { Overloads };
