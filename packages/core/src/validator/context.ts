import type { StoreData } from '@/helpers';
import type { Validator } from './interface';

export interface Context<TData extends StoreData> {
	$$type: 'validator';
	$$instance: Validator<TData>;
}
