export interface Context<T extends Readonly<string>> {
	readonly $$type: T;
}
