export const tryParseInt = (str: string, defaultValue: number) => {
	if (str.length == 0) return defaultValue;

	let reg = /^\d+$/;
	if (!reg.test(str)) return defaultValue;

	let value = parseInt(str);
	if (isNaN(value)) return defaultValue;

	return value;
};
