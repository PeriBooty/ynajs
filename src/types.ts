type ynaCommandFn = (...args: any[]) => any;

type ynaCommandFnMap = Map<string, ynaCommandFn>;

export { ynaCommandFn, ynaCommandFnMap };
