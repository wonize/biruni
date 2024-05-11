import type { StoreData } from '@biruni/core/helpers';
import { BiruniPlugin, type ContextType } from '@biruni/core/plugin';

class LocalStoragePlugin<Data extends StoreData> extends BiruniPlugin<Data> {
	override type: ContextType = 'persister';
	override name: 'built-in/localStorage' = 'built-in/localStorage';

	constructor() {
		super();
	}

	override preprocess: (data: Data) => Promise<Data> = async (data) => {
		return localStorage.getItem(this.namespace) as unknown as Data;
	};

	override postprocess: (data: Data) => Promise<Data> = async (data) => {
		if (typeof data !== 'string') {
			throw 'Error: <afterSet> in <built-in/localStorage>' + this.namespace;
		}
		localStorage.setItem(this.namespace, data as unknown as string);
		return data;
	};
}

const localstorage = <Data extends StoreData>() => {
	return new LocalStoragePlugin<Data>();
};

export default localstorage;
export { localstorage as LocalStoragePlugin, localstorage };
