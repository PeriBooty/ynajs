import { ynaCommandMap, ynaTree, ynaKeyMap } from "./types";

declare class IYna {
    public tree: ynaTree;
    public commands: ynaCommandMap;
    public keys: ynaKeyMap;
    constructor(yna: string, options: object, data: object);
    public addCommand(name: string, fn: any): void;
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
    public transformer: any;
    public commands: ynaCommandMap;
    public keys: ynaKeyMap;
    constructor(
        commands: ynaCommandMap,
        keys: ynaKeyMap,
        options: IYnaRunnerOptions,
        data: IYnaData
    );
    public execItem(item, transformerCustom?): string;
    public execArr(itemArr);
    public resolveCommand(name, data);
    public resolveKey(name);
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
    IYnaRunner,
    IYnaParserIsControlTree,
    IYnaTree,
    IYnaTreeBlockResult
};
