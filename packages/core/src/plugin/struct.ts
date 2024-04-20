import { CoreContext } from '../context';
import type { ExactPlugin } from './plugin';

export type PluginStruct<TValue extends object> = {
	validator: CoreContext<TValue>;
	parser: CoreContext<TValue>;
	persister: CoreContext<TValue>;
};

// Record<'validator' | 'parser' | 'persister', Array<ExactPlugin>>;
