import type { PluginInner } from "./plugin";

export type PluginStruct = Record<'validator' | 'parser' | 'persister', Array<PluginInner>>
