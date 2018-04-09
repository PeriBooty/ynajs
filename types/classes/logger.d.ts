import { IYnaData, IYnaOptionsBase } from "../interfaces";
declare const YnaLogger: {
    new (name: string, options: IYnaOptionsBase, data: IYnaData): {
        name: string;
        options: IYnaOptionsBase;
        data: IYnaData;
        log(arr: string[], contents: any): void;
    };
};
export default YnaLogger;
