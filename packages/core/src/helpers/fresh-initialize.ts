export function shouldFreshInitializing(source: object, target: object): boolean {
	return JSON.stringify({ input: source }) !== JSON.stringify({ input: target });
}
