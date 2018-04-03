import { ynaCommandFnMap } from "./types";
declare class IYna {
    tree: any;
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
    constructor(name: string, options: any, data: any);
    log(arr: string[], data: any): void;
}
declare class IYnaParser extends IYnaLogger {
    constructor(options: any, data: any);
    parseString(yna: string): void;
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
export { IYna, IYnaOptions, IYnaRunnerOptions, IYnaData, IYnaLogger, IYnaParser };
