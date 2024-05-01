import type { StoreData } from "../helpers/mod";

export interface Validator<Data extends StoreData> {
	validate<CustomData extends Data>(data: CustomData): boolean;
}
