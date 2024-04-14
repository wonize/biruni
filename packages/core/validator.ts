import type { Context } from "./context";

export interface ValidatorCore<Value extends object> {
	validate<TValue extends Value>(value: TValue): boolean;
}

export interface ValidatorContext<Value extends object> extends Context<'validator'> {
	$$type: 'validator';
	$$instance: ValidatorCore<Value>;
}
