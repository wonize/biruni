import type { StoreData } from "./globals";
import type { PluginStruct } from "./plugin/mod";

export class StoreCore<S extends StoreData> {
	public constructor(
		protected pluginStruct: PluginStruct<S>,
	) { }
}
