const toRegex = (str: string): RegExp =>
    new RegExp(str.substr(1, str.length - 2));

const isRegex = (str: string): boolean =>
    str.length > 2 && str.startsWith("/") && str.endsWith("/");

export { toRegex, isRegex };
