import {
    ynaCommand,
    ynaCommandMap,
    ynaCommandTransformer,
    ynaKeyMap,
    ynaRange,
    ynaTree,
    ynaTreeItems
} from "./types";

declare class IYna {
    public tree: ynaTree;
    public commands: ynaCommandMap;
    constructor(yna: string, options: object, data: object);
    public addCommand(name: string, fn: ynaCommand): void;
    public run(
        args: string[],
        ctx: object,
        options: object,
        data: object
    ): string;
}

declare class IYnaLogger {
    public name: string;
    public options: IYnaOptions;
    public data: IYnaData;
    constructor(name: string, options: IYnaOptions, data: IYnaData);
    public log(arr: string[], data: IYnaData): void;
}

declare class IYnaParser extends IYnaLogger {
    constructor(options: IYnaOptions, data: IYnaData);
    public parseString(str: string): string | ynaTree;
    public parseBlock(str: string): ynaTree;
    public parseBlockData(str: string): IYnaTreeBlockResult;
}

declare class IYnaRunner extends IYnaLogger {
    public defaults: {
        transformer: ynaCommandTransformer;
        commands: ynaCommandMap;
        keys: ynaKeyMap;
    };
    public transformer: ynaCommandTransformer;
    public commands: ynaCommandMap;
    public keys: ynaKeyMap;
    public depth: number;
    constructor(
        commands: ynaCommandMap,
        keys: ynaKeyMap,
        options: IYnaOptions,
        data: IYnaData
    );
    public execItem(
        item: ynaTree,
        transformerCustom?: ynaCommandTransformer
    ): string;
    public execArr(itemArr: IYnaTree): string[];
    public resolveCommand(name: string, data: IYnaTree): string;
    public resolveKey(name: string): string;
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

export {
    IYna,
    IYnaOptions,
    IYnaData,
    IYnaLogger,
    IYnaParser,
    IYnaRunner,
    IYnaParserIsControlTree,
    IYnaTree,
    IYnaTreeBlockResult,
    IYnaMathDef,
    IYnaWhenDef
};
