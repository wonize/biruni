import type * as Context from '@/context';
import type { StoreData } from "@/helpers";

export interface PluginFunction<Params extends ReadonlyArray<unknown>> {
	<Data extends StoreData>(...params: Params): Context.Core<Data>;
}