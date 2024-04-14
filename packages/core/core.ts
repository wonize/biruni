export class Core<V extends object> {
	async set<TValue extends V>(value: TValue): Promise<void>;
	async set<TValue extends V>(setter: (draft: TValue) => TValue): Promise<void>;
	async set<TValue extends V>(valueOrSetter: TValue | ((draft: TValue) => TValue)): Promise<void> {
	}

	async get<TValue extends V>(): Promise<TValue> {
		return {} as TValue
	}
}
