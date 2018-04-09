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
import { ynaParserIterator, ynaTree, ynaCommandMap, ynaKeyMap } from "../types";
import YnaLogger from "./logger";
import { stringifyError } from "../util/stringify";

const YnaRunner = class extends YnaLogger implements IYnaRunner {
    public transformer: any;
    public commands: ynaCommandMap;
    public keys: ynaKeyMap;
    constructor(commands, keys, options, data) {
        super("RUNNER", options, data);
        this.commands = commands;
        this.keys = keys;
    }
    public execItem(item, transformerCustom?): string {
        return "";
    }
    public execArr(itemArr) {}
    public resolveCommand(name, data) {}
    public resolveKey(name) {}
};

export default YnaRunner;
