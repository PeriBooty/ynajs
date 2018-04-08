import { ynaCommandFnMap, ynaTree } from "./types";

declare class IYna {
    public tree: ynaTree;
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
    constructor(name: string, options: IYnaOptions, data: IYnaData);
    public log(arr: string[], data: IYnaData): void;
}

declare class IYnaParser extends IYnaLogger {
    constructor(options: IYnaOptions, data: IYnaData);
    public parseString(str: string): string | ynaTree;
    public parseBlock(str: string): ynaTree;
    public parseBlockData(str: string): IYnaTreeBlockResult;
}

interface IYnaParserIsControlTree {
    open: boolean;
    close: boolean;
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

interface IYnaTree extends Array<any> {
    [index: number]: string | number | IYnaTree;
}

interface IYnaTreeBlockResult {
    name: ynaTree;
    args: ynaTree;
}

export {
    IYna,
    IYnaOptions,
    IYnaRunnerOptions,
    IYnaData,
    IYnaLogger,
    IYnaParser,
    IYnaParserIsControlTree,
    IYnaTree,
    IYnaTreeBlockResult
};
