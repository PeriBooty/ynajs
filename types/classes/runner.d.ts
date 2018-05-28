import { IYnaData, IYnaOptions, IYnaRunnerCustomizable, IYnaRunnerCustomizableOptionals, IYnaTree } from "../interfaces";
import { ynaCommand, ynaCommandTransformer, ynaTree } from "../types";
declare const YnaRunner: {
    new (commands: Map<string, ynaCommand>, keys: Map<string, any>, options: IYnaOptions, data: IYnaData): {
        defaults: IYnaRunnerCustomizable;
        transformer: ynaCommandTransformer;
        commands: Map<string, ynaCommand>;
        keys: Map<string, any>;
        depth: number;
        execItem(item: ynaTree, custom?: IYnaRunnerCustomizableOptionals | undefined): string;
        execArr(itemArr: IYnaTree): string[];
        resolveCommand(name: string, tree: IYnaTree): string;
        resolveKey(name: string): string;
        name: string;
        options: IYnaOptions;
        data: IYnaData;
        log(arr: string[], contents: any): void;
    };
};
export { YnaRunner };
