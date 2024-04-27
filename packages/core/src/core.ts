import type { StoreData } from "./globals";
import type { PluginStruct } from "./plugin/mod";

export class StoreCore<TData extends StoreData> {
	public constructor(
		protected pluginStruct: PluginStruct<TData>,
	) { }
}
