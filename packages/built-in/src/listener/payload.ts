import type { DataObject } from '../../../core/src/helpers/type-utility';
import type { EventName } from './event';

export type Payload<Event extends EventName = 'change', Data extends DataObject = DataObject> = {
	change: ChangePayload<Data>;
}[Event];

export interface ChangePayload<Data extends DataObject> {
	diff: Partial<{ [P in keyof Data]: { source: Data[P]; target: Data[P] } }>;
	keys: Partial<Array<keyof Data>>;
	source: Partial<Data>;
	target: Partial<Data>;
}
