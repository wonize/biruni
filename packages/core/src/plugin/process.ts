import type { StoreData } from '../helpers/type-utility';
import type { PluginStack } from './stack';

const preprocess = async <Data extends StoreData>(data: Data, pluginStack: PluginStack<Data>) => {
	let $data: Data = data;

	for (const plugin of pluginStack) {
		if (plugin.type === 'persister') {
			$data = await plugin.preprocess($data);
		}
	}

	for (const plugin of pluginStack) {
		if (plugin.type === 'parser') {
			$data = await plugin.preprocess($data);
		}
	}

	for (const plugin of pluginStack) {
		if (plugin.type === 'validator') {
			$data = await plugin.preprocess($data);
		}
	}

	for (const plugin of pluginStack) {
		if (plugin.type === 'synchronizer') {
			$data = await plugin.preprocess($data);
		}
	}

	return $data;
};

const postprocess = async <Data extends StoreData>(data: Data, pluginStack: PluginStack<Data>) => {
	let $data: Data = data;

	for (const plugin of pluginStack) {
		if (plugin.type === 'validator') {
			$data = await plugin.postprocess($data);
		}
	}

	for (const plugin of pluginStack) {
		if (plugin.type === 'synchronizer') {
			$data = await plugin.postprocess($data);
		}
	}

	for (const plugin of pluginStack) {
		if (plugin.type === 'parser') {
			$data = await plugin.postprocess($data);
		}
	}

	for (const plugin of pluginStack) {
		if (plugin.type === 'persister') {
			$data = await plugin.postprocess($data);
		}
	}

	return $data;
};

export { postprocess, preprocess };
