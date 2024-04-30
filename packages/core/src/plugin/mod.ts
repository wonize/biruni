import type { ExactPlugin, Plugin } from './plugin';
import type { PluginStruct } from './struct';

export * from './plugin';
export * from './struct';
export type {
	ExactPlugin as Executor, Plugin as Function, PluginStruct as Struct
};
