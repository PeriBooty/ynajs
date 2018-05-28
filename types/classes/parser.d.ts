import { IYnaData, IYnaOptions, IYnaTreeBlockResult } from "../interfaces";
import { ynaTree } from "../types";
declare const YnaParser: {
    new (options: IYnaOptions, data: IYnaData): {
        parseString(str: string, stripEmpty?: boolean): ynaTree;
        parseBlock(str: string): ynaTree;
        parseBlockData(str: string): IYnaTreeBlockResult;
        name: string;
        options: IYnaOptions;
        data: IYnaData;
        log(arr: string[], contents: any): void;
    };
};
export { YnaParser };
