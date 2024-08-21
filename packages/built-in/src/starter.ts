import Core, { Plugin } from '@biruni/core';
import type { DataObject } from '@biruni/core/helpers';
import { GetAccessor, HasAccessor, SetAccessor } from './accessor';
import { EventPlugin } from './event/mod';
import { JsonPlugin } from './json/mod';
import { LocalStoragePlugin } from './localstorage/mod';

export class StarterPack<Data extends DataObject> extends Plugin<Data> {
	public constructor() {
		super('biruni.starter');
	}

	public override setup(core: Core<Data, string>): void {
		super.setup(core);
		core.plug(new SetAccessor<Data>());
		core.plug(new GetAccessor<Data>());
		core.plug(new HasAccessor<Data>());
		core.plug(new JsonPlugin<Data>());
		core.plug(new LocalStoragePlugin<Data>());
		core.plug(new EventPlugin<Data>());
	}
}

export function starter<Data extends DataObject = DataObject>() {
	return new StarterPack<Data>();
}

export default starter;
