export const clone = <Input extends object>(input: Input): Input => {
	return Object.assign({}, JSON.parse(JSON.stringify({ cloned: input })).cloned);
};
