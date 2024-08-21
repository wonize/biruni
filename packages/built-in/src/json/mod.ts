import Core, { DataFlow, Plugin } from '@biruni/core';
import type { DataObject } from '@biruni/core/helpers';

export class JsonParsePlugin<Data extends DataObject> extends Plugin<Data> {
	public constructor() {
		super('json.parse');
	}

	public override flow: DataFlow = DataFlow.OUTPUT;

	public override setup(core: Core<Data>) {
		super.setup(core);
	}

	public override process(data: Data | string): Data {
		if (typeof data === 'string' || data instanceof String) {
			return JSON.parse(data as string);
		}
		return data;
	}
}

export class JsonStringifyPlugin<Data extends DataObject> extends Plugin<Data> {
	public constructor() {
		super('json.stringify');
	}

	public override flow: DataFlow = DataFlow.INPUT;

	public override setup(core: Core<Data>) {
		super.setup(core);
	}

	public override process(data: Data): Data {
		return JSON.stringify(data) as unknown as Data;
	}
}

export class JsonPlugin<Data extends DataObject> extends Plugin<Data> {
	public constructor() {
		super('json');
	}

	public override setup(core: Core<Data>) {
		super.setup(core);
		core.plug(new JsonParsePlugin<Data>());
		core.plug(new JsonStringifyPlugin<Data>());
	}
}

export function json<Data extends DataObject>() {
	return new JsonPlugin<Data>();
}

export default json;
