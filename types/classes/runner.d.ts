import { IYnaData, IYnaOptionsBase, IYnaRunnerOptions, IYnaTree } from "../interfaces";
import { ynaCommand, ynaCommandTransformer, ynaTree } from "../types";
declare const YnaRunner: {
    new (commands: Map<string, ynaCommand>, keys: Map<string, any>, options: IYnaRunnerOptions, data: IYnaData): {
        transformer: ynaCommandTransformer;
        commands: Map<string, ynaCommand>;
        keys: Map<string, any>;
        depth: number;
        execItem(item: ynaTree, transformerCustom?: ynaCommandTransformer | undefined): string;
        execArr(itemArr: IYnaTree): string[];
        resolveCommand(name: string, tree: IYnaTree): string;
        resolveKey(name: string): string;
        name: string;
        options: IYnaOptionsBase;
        data: IYnaData;
        log(arr: string[], contents: any): void;
    };
};
export default YnaRunner;
