export const clone = <Input extends unknown>(input: Input): Input => {
	return Object.assign({}, JSON.parse(JSON.stringify({ cloned: input })).cloned);
};
