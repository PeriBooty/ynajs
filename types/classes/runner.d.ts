import { IYnaTree } from "../interfaces";
import { ynaTree, ynaCommandTransformer } from "../types";
declare const YnaRunner: {
    new (commands: any, keys: any, options: any, data: any): {
        transformer: ynaCommandTransformer;
        commands: Map<string, (...args: any[]) => any>;
        keys: Map<string, any>;
        execItem(item: ynaTree, transformerCustom?: ynaCommandTransformer | undefined): string;
        execArr(itemArr: IYnaTree): string[];
        resolveCommand(name: string, data: IYnaTree): string;
        resolveKey(name: string): string;
        name: string;
        options: any;
        data: any;
        log(arr: string[], contents: any): void;
    };
};
export default YnaRunner;
