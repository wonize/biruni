import type { StoreData } from '@biruni/core/helpers';
import { BiruniPlugin, type ContextType } from '@biruni/core/plugin';

class LocalStoragePlugin<Data extends StoreData> extends BiruniPlugin<Data> {
	override type: ContextType = 'persister';
	override name = 'built-in/localStorage' as const;

	public constructor() {
		super();
	}

	// @ts-expect-error the `getItem` never return null, handled by initializer
	override preprocess: (data: Data) => Promise<Data> = async () => {
		return localStorage.getItem(this.namespace);
	};

	override postprocess: (data: Data) => Promise<Data> = async (data) => {
		if (typeof data !== 'string') {
			throw 'Error: <postprocess> in <built-in/localStorage>' + this.namespace;
		}

		localStorage.setItem(this.namespace, data);
		return data;
	};
}

const localstorage = <Data extends StoreData>() => {
	return new LocalStoragePlugin<Data>();
};

export default localstorage;
export { localstorage as LocalStoragePlugin, localstorage };
