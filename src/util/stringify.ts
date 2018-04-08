const stringifyError = (key: string, err: Error) => `<${key}:${err.message}>`;

export { stringifyError };
