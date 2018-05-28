import { IYnaData, IYnaOptions } from "../interfaces";
declare const YnaLogger: {
    new (name: string, options: IYnaOptions, data: IYnaData): {
        name: string;
        options: IYnaOptions;
        data: IYnaData;
        log(arr: string[], contents: any): void;
    };
};
export { YnaLogger };
