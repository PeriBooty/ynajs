declare const YnaParser: {
    new (options: any, data: any): {
        parseString(yna: string): void;
        name: string;
        options: any;
        data: any;
        log(arr: string[], data: any): void;
    };
};
export default YnaParser;
