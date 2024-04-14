import type { Context } from "../context";
import type { Validator } from "./validator";

export interface ValidatorContext<Value extends object> extends Context<'validator'> {
	$$type: 'validator';
	$$instance: Validator<Value>;
}
