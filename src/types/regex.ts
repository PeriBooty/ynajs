const toRegex = (str: string): RegExp => new RegExp(str);
const isRegex = (str: string): boolean =>
    str.length > 2 && str.startsWith("/") && str.endsWith("/");

export { toRegex, isRegex };
