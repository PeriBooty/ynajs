const escapeKeyVal = (keyVal: any): string => typeof keyVal == "string" ? keyVal.replace("\n", "\\\\n") : keyVal;

export { escapeKeyVal };
