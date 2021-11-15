export function camelToKebab(string) {
	return string
		.split(/(?=[A-Z])/)
		.join('-')
		.toLowerCase();
}

export function kebabToCamel(string) {
	return string.replace(/-./g, s => s.toUpperCase()[1]);
}
