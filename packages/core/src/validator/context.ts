import type { StoreData } from '../helpers';
import type { Validator } from './validator';

export interface ValidatorContext<TData extends StoreData> {
	$$type: 'validator';
	$$instance: Validator<TData>;
}
