import type { StoreData } from '../helpers/mod.ts';
import type { AddListenerMethods } from './add.ts';
import type { RemoveListenerMethods } from './remove.ts';

interface ListenerMethods<Data extends StoreData>
	extends AddListenerMethods<Data>,
		RemoveListenerMethods<Data> {}

export type { ListenerMethods };
