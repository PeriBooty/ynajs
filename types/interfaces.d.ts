import { ynaCommandFnMap, ynaTree } from "./types";
declare class IYna {
    tree: ynaTree;
    commands: ynaCommandFnMap;
    keys: any;
    constructor(yna: string, options: object, data: object);
    addCommand(name: string, fn: any): void;
    run(args: any[], ctx: object, options: object, data: object): string;
}
declare class IYnaLogger {
    name: string;
    options: any;
    data: any;
    constructor(name: string, options: IYnaOptions, data: IYnaData);
    log(arr: string[], data: IYnaData): void;
}
declare class IYnaParser extends IYnaLogger {
    constructor(options: IYnaOptions, data: IYnaData);
    parseString(str: string): string | ynaTree;
    parseBlock(str: string): ynaTree;
    parseBlockData(str: string): IYnaTreeBlockResult;
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
export { IYna, IYnaOptions, IYnaRunnerOptions, IYnaData, IYnaLogger, IYnaParser, IYnaParserIsControlTree, IYnaTree, IYnaTreeBlockResult };
