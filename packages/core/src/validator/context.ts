import type { StoreData } from '../globals';
import type { Validator } from './validator';

export interface ValidatorContext<S extends StoreData> {
	$$type: 'validator';
	$$instance: Validator<S>;
}
