import type { Plugin } from '@biruni/core';
import type { StoreData } from '@biruni/core/helpers';
import { BiruniPlugin, type ContextType } from '@biruni/core/plugin';

class JsonPlugin<Data extends StoreData> extends BiruniPlugin<Data> {
	override type: ContextType = 'parser';
	override name: 'built-in/json' = 'built-in/json';

	constructor() {
		super();
	}

	override preprocess: (data: Data) => Promise<Data> = async (data) => {
		if (data) return JSON.parse(data as unknown as string) as Data;
		return data;
	};

	override postprocess: (data: Data) => Promise<Data> = async (data) => {
		return JSON.stringify(data ?? {}) as unknown as Data;
	};
}

const json: Plugin.Function = <Data extends StoreData>() => {
	return new JsonPlugin<Data>();
};

export default json;
export { json as JsonPlugin, json };
