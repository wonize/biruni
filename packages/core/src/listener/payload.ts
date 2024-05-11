import type { StoreData } from '../helpers/type-utility';
import type { EventName } from './event';

export type Payload<Event extends EventName = 'change', Data extends StoreData = StoreData> = {
	change: ChangePayload<Data>;
}[Event];

export type ChangePayload<Data extends StoreData> = {
	diff: Partial<{ [P in keyof Data]: { source: Data[P]; target: Data[P] } }>;
	keys: Partial<Array<keyof Data>>;
	source: Partial<Data>;
	target: Partial<Data>;
};
