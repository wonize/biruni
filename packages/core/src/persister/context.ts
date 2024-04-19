import type { Persister } from "./persister";

export interface PersisterContext<Value extends object> {
	readonly $$type: 'persister';
	$$instance: Persister<Value>
}
