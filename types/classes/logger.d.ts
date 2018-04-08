import { IYnaData, IYnaOptions } from "../interfaces";
declare const YnaLogger: {
    new (name: string, options: IYnaOptions, data: IYnaData): {
        name: string;
        options: any;
        data: any;
        log(arr: string[], contents: any): void;
    };
};
export default YnaLogger;
