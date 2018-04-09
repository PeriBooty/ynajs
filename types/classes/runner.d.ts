declare const YnaRunner: {
    new (commands: any, keys: any, options: any, data: any): {
        transformer: any;
        commands: Map<string, (...args: any[]) => any>;
        keys: Map<string, string>;
        execItem(item: any, transformerCustom?: any): string;
        execArr(itemArr: any): void;
        resolveCommand(name: any, data: any): void;
        resolveKey(name: any): void;
        name: string;
        options: any;
        data: any;
        log(arr: string[], contents: any): void;
    };
};
export default YnaRunner;
