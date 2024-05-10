import type { StoreData } from '../helpers/mod';
import type { AddListenerMethods } from './add';
import type { RemoveListenerMethods } from './remove';

interface ListenerMethods<Data extends StoreData>
	extends AddListenerMethods<Data>,
		RemoveListenerMethods<Data> {}

export type { ListenerMethods };
