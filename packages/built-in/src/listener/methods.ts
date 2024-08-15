import type { DataObject } from '../../../core/src/helpers/mod';
import type { AddListenerMethods } from './add';
import type { RemoveListenerMethods } from './remove';

interface ListenerMethods<Data extends DataObject>
	extends AddListenerMethods<Data>,
		RemoveListenerMethods<Data> {}

export type { ListenerMethods };
