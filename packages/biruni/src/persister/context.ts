import type { Context } from "../context";
import type { Persister } from "./persister";

export interface PersisterContext<Value extends object> extends Context<'persister'> {
	$$type: 'persister';
	$$instance: Persister<Value>
}
