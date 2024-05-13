import type { StoreData } from '@biruni/core/helpers';
import { BiruniPlugin, type ContextType } from '@biruni/core/plugin';
import {
	Preferences,
	type ConfigureOptions,
	type PreferencesPlugin as PreferencesInterface,
} from '@capacitor/preferences';

class PreferencesPlugin<Data extends StoreData> extends BiruniPlugin<Data> {
	override readonly type: ContextType = 'persister';
	override readonly name = 'capacitor/preferences' as const;

	#preferences: PreferencesInterface;
	public constructor(options?: ConfigureOptions) {
		super();
		this.#preferences = Preferences;
		if (options) {
			this.#preferences.configure(options);
		}
	}

	// @ts-expect-error the `preferences` never return null, because it's handled by initializer
	override preprocess: (data: Data) => Promise<Data> = async () => {
		const $data = await Preferences.get({ key: this.namespace });
		return $data.value;
	};

	override postprocess: (data: Data) => Promise<Data> = async (data) => {
		// @ts-expect-error the `data` will be passed as `string` cause it's first passed to `stringifier`
		await Preferences.set({ key: this.name, value: data });
		return data;
	};
}

const preferences = <Data extends StoreData>(options?: ConfigureOptions): BiruniPlugin<Data> => {
	return new PreferencesPlugin<Data>(options);
};

export default preferences;
export { preferences as PreferencesPlugin, preferences };
