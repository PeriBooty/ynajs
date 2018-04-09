import { IYnaData, IYnaTree, IYnaOptionsBase, IYnaRunnerOptions } from "../interfaces";
import { ynaTree, ynaCommandTransformer } from "../types";
declare const YnaRunner: {
    new (commands: Map<string, (...args: any[]) => any>, keys: Map<string, any>, options: IYnaRunnerOptions, data: IYnaData): {
        transformer: ynaCommandTransformer;
        commands: Map<string, (...args: any[]) => any>;
        keys: Map<string, any>;
        execItem(item: ynaTree, transformerCustom?: ynaCommandTransformer | undefined): string;
        execArr(itemArr: IYnaTree): string[];
        resolveCommand(name: string, data: IYnaTree): string;
        resolveKey(name: string): string;
        name: string;
        options: IYnaOptionsBase;
        data: IYnaData;
        log(arr: string[], contents: any): void;
    };
};
export default YnaRunner;
