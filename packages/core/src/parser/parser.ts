export interface Parser<Value extends object> {
	parse<TValue extends Value>(value: string): TValue;
	stringify<TValue extends Value>(value: TValue): string;
}
