import { ynaCommand, ynaCommandMap, ynaCommandTransformer, ynaKeyMap, ynaRange, ynaTree, ynaTreeItems } from "./types";
declare class IYna {
    tree: ynaTree;
    commands: ynaCommandMap;
    constructor(yna: string, options: object, data: object);
    addCommand(name: string, fn: ynaCommand): void;
    run(args: string[], ctx: object, options: object, data: object): string;
}
declare class IYnaLogger {
    name: string;
    options: IYnaOptionsBase;
    data: IYnaData;
    constructor(name: string, options: IYnaOptionsBase, data: IYnaData);
    log(arr: string[], data: IYnaData): void;
}
declare class IYnaParser extends IYnaLogger {
    constructor(options: IYnaOptions, data: IYnaData);
    parseString(str: string): string | ynaTree;
    parseBlock(str: string): ynaTree;
    parseBlockData(str: string): IYnaTreeBlockResult;
}
declare class IYnaRunner extends IYnaLogger {
    transformer: ynaCommandTransformer;
    commands: ynaCommandMap;
    keys: ynaKeyMap;
    constructor(commands: ynaCommandMap, keys: ynaKeyMap, options: IYnaRunnerOptions, data: IYnaData);
    execItem(item: ynaTree, transformerCustom?: ynaCommandTransformer): string;
    execArr(itemArr: IYnaTree): string[];
    resolveCommand(name: string, data: IYnaTree): string;
    resolveKey(name: string): string;
}
interface IYnaParserIsControlTree {
    open: boolean;
    close: boolean;
}
interface IYnaOptionsBase {
    debug: boolean;
}
interface IYnaOptions extends IYnaOptionsBase {
    loadJSON: boolean;
}
interface IYnaRunnerOptions extends IYnaOptionsBase {
    depth: number;
}
interface IYnaData {
    [key: string]: any;
}
interface IYnaTree extends Array<any> {
    [index: number]: ynaTreeItems;
}
interface IYnaTreeBlockResult {
    name: ynaTree;
    args: ynaTree;
}
interface IYnaMathDef {
    argsLengthRange: ynaRange;
    fn: (...args: any[]) => number | Error;
}
interface IYnaWhenDef {
    type: string;
    fn: (...args: any[]) => number | Error;
}
export { IYna, IYnaOptionsBase, IYnaOptions, IYnaRunnerOptions, IYnaData, IYnaLogger, IYnaParser, IYnaRunner, IYnaParserIsControlTree, IYnaTree, IYnaTreeBlockResult, IYnaMathDef, IYnaWhenDef };
