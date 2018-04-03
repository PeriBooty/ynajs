declare const YnaLogger: {
    new (name: string, options: any, data: any): {
        name: string;
        options: any;
        data: any;
        log(arr: string[], data: any): void;
    };
};
export default YnaLogger;
