import { ynaControlData, ynaControlTree, ynaIds } from "../enums";
import {
    IYnaData,
    IYnaOptions,
    IYnaParser,
    IYnaParserIsControlTree,
    IYnaTree,
    IYnaTreeBlockResult,
    IYnaRunner
} from "../interfaces";
import {
    ynaParserIterator,
    ynaTree,
    ynaCommandMap,
    ynaKeyMap,
    ynaCommandTransformer
} from "../types";
import YnaLogger from "./logger";
import { stringifyError } from "../types/stringify";

const transformerDefault: ynaCommandTransformer = (str: string): string => str;

const YnaRunner = class extends YnaLogger implements IYnaRunner {
    public transformer: ynaCommandTransformer;
    public commands: ynaCommandMap;
    public keys: ynaKeyMap;
    constructor(commands, keys, options, data) {
        super("RUNNER", options, data);
        this.commands = commands;
        this.keys = keys;
        this.transformer = transformerDefault;
    }
    public execItem(
        item: ynaTree,
        transformerCustom?: ynaCommandTransformer
    ): string {
        return "";
    }
    public execArr(itemArr: IYnaTree): string[] {
        return [];
    }
    public resolveCommand(name: string, data: IYnaTree): string {
        return "";
    }
    public resolveKey(name: string): string {
        return "";
    }
};

export default YnaRunner;
