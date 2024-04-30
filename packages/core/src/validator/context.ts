import type { StoreData } from '@/helpers';
import type { Validator } from './interface';

export interface Context<Data extends StoreData> {
	$$type: 'validator';
	$$instance: Validator<Data>;
}
