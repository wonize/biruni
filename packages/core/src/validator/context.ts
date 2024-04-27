import type { StoreData } from '../globals';
import type { Validator } from './validator';

export interface ValidatorContext<TData extends StoreData> {
	$$type: 'validator';
	$$instance: Validator<TData>;
}
