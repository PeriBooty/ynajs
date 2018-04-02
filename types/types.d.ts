declare type ynaCommandFn = (...args: any[]) => any;
declare type ynaCommandFnMap = Map<string, ynaCommandFn>;
export { ynaCommandFn, ynaCommandFnMap };
