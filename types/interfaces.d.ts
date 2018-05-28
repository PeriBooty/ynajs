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
    options: IYnaOptions;
    data: IYnaData;
    constructor(name: string, options: IYnaOptions, data: IYnaData);
    log(arr: string[], data: IYnaData): void;
}
declare class IYnaParser extends IYnaLogger {
    constructor(options: IYnaOptions, data: IYnaData);
    parseString(str: string): string | ynaTree;
    parseBlock(str: string): ynaTree;
    parseBlockData(str: string): IYnaTreeBlockResult;
}
declare class IYnaRunner extends IYnaLogger {
    defaults: {
        transformer?: ynaCommandTransformer;
        commands?: ynaCommandMap;
        keys?: ynaKeyMap;
    };
    transformer: ynaCommandTransformer;
    commands: ynaCommandMap;
    keys: ynaKeyMap;
    depth: number;
    constructor(commands: ynaCommandMap, keys: ynaKeyMap, options: IYnaOptions, data: IYnaData);
    execItem(item: ynaTree, transformerCustom?: ynaCommandTransformer): string;
    execArr(itemArr: IYnaTree): string[];
    resolveCommand(name: string, data: IYnaTree): string;
    resolveKey(name: string): string;
}
interface IYnaParserIsControlTree {
    open: boolean;
    close: boolean;
}
interface IYnaOptions {
    debug: boolean;
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
export { IYna, IYnaOptions, IYnaData, IYnaLogger, IYnaParser, IYnaRunner, IYnaParserIsControlTree, IYnaTree, IYnaTreeBlockResult, IYnaMathDef, IYnaWhenDef };
