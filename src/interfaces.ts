import { ynaCommandFnMap } from "./types";

declare class IYna {
    public tree: any;
    public commands: ynaCommandFnMap;
    public keys: any;
    constructor(yna: string, options: object, data: object);
    public addCommand(name: string, fn: any): void;
    public run(args: any[], ctx: object, options: object, data: object): string;
}

declare class IYnaLogger {
    public name: string;
    public options: any;
    public data: any;
    constructor(name: string, options: any, data: any);
    public log(arr: string[], data: any): void;
}

declare class IYnaParser extends IYnaLogger {
    constructor(options: any, data: any);
    public parseString(yna: string): void;
}

interface IYnaOptions {
    debug: boolean;
    loadJSON: boolean;
}

interface IYnaRunnerOptions {
    debug: boolean;
    depth: number;
}

interface IYnaData {
    [key: string]: any;
}

export {
    IYna,
    IYnaOptions,
    IYnaRunnerOptions,
    IYnaData,
    IYnaLogger,
    IYnaParser
};
