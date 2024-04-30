import type { StoreData } from "../helpers";

export interface Validator<Data extends StoreData> {
	validate<CustomData extends Data>(data: CustomData): boolean;
}
