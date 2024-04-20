import type { Validator } from './validator';

export interface ValidatorContext<Value extends object> {
	$$type: 'validator';
	$$instance: Validator<Value>;
}
