import Core, { DataFlow, Plugin } from '@biruni/core';
import type { DataObject } from '@biruni/core/helpers';

class LocalStorageGetPlugin<Data extends DataObject> extends Plugin<Data> {
	public constructor() {
		super('localstorage.get');
	}

	public override flow: DataFlow = DataFlow.OUTPUT;

	public override setup(core: Core<Data>) {
		super.setup(core);
	}

	public override process(): Data {
		// @ts-expect-error return <string> type is accepted
		return localStorage.getItem(this.core.namespace);
	}
}

class LocalStorageSetPlugin<Data extends DataObject> extends Plugin<Data> {
	public constructor() {
		super('localstorage.set');
	}

	public override flow: DataFlow = DataFlow.INPUT;

	public override setup(core: Core<Data>) {
		super.setup(core);
		document.addEventListener('storage', this.on_change_storage.bind(this));
	}

	private on_change_storage(/* event */) {
		/// FIXME: need more research
		//	this.core.process(DataFlow.INPUT, (data) => {
		//		return diff(data, event.data);
		//	})
	}

	public override process(data: Data): Data {
		if (typeof data === 'string' || data instanceof String) {
			localStorage.setItem(this.core.namespace, data as unknown as string);
		}
		return data;
	}
}

class LocalStoragePlugin<Data extends DataObject> extends Plugin<Data> {
	public constructor() {
		super('localstorage');
	}

	public override setup(core: Core<Data>) {
		super.setup(core);
		core.plug(new LocalStorageGetPlugin<Data>());
		core.plug(new LocalStorageSetPlugin<Data>());
	}
}

function localstorage() {
	return new LocalStoragePlugin();
}

export { localstorage, LocalStoragePlugin };
