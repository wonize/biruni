export interface Validator<Value extends object> {
	validate<TValue extends Value>(value: TValue): boolean;
}
