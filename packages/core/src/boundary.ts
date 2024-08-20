import cloneDeep from 'lodash.clonedeep';

type BoundaryFunction = (...args: unknown[]) => unknown;
type BoundaryMap = Record<PropertyKey, unknown | BoundaryFunction>;

export class Boundary<R extends BoundaryMap = BoundaryMap> {
	#boundaries: R;

	public constructor(boundaries?: R) {
		this.#boundaries = boundaries ?? Object.assign({});
	}

	public inject(name: string, boundary: unknown): BoundaryMap {
		const boundary_item = { [name]: boundary };
		this.#boundaries = Object.assign({}, cloneDeep(this.#boundaries), boundary_item);
		return boundary_item;
	}

	public eject(): R {
		return this.#boundaries;
	}
}
