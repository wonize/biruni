import type { Plugin } from '@biruni/core';
import type { ContextType } from '@biruni/core/context';
import type { StoreData } from '@biruni/core/helpers';
import { BiruniPlugin } from '@biruni/core/plugin';

class LocalStoragePlugin<Data extends StoreData> extends BiruniPlugin<Data> {
	override type: ContextType = 'persister';
	override name: 'built-in/localStorage' = 'built-in/localStorage';

	constructor() {
		super();
	}

	override beforeGet: (data: Data) => Promise<Data> = async (data) => {
		return localStorage.getItem(this.namespace!) as unknown as Data;
	};

	override afterSet: (data: Data) => Promise<Data> = async (data) => {
		localStorage.setItem(this.namespace!, data as unknown as string);
		return data;
	};
}

const localstorage: Plugin.Function = <Data extends StoreData>() => {
	return new LocalStoragePlugin<Data>();
};

export default localstorage;
export { localstorage as LocalStoragePlugin, localstorage };
