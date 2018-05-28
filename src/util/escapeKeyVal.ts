const escapeKeyVal = (keyVal: string): string => keyVal.replace("\n", "\\\\n");

export { escapeKeyVal };
