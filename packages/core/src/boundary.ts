import cloneDeep from 'lodash.clonedeep';

export class Boundary<R extends Record<string, unknown> = Record<string, unknown>> {
	#boundaries: R;
	public constructor(boundaries?: R) {
		this.#boundaries = boundaries ?? Object.assign({});
	}
	public inject(name: string, boundary: unknown) {
		const boundary_item = { [name]: boundary };
		this.#boundaries = Object.assign({}, cloneDeep(this.#boundaries), boundary_item);
		return boundary_item;
	}
	public eject() {
		return this.#boundaries;
	}
}
