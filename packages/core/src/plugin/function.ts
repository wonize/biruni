import type * as Context from '../context';
import type { StoreData } from "../helpers/mod";

export interface PluginFunction {
	<Data extends StoreData>(): Context.Core<Data>;
}