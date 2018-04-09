import { ynaControlData, ynaControlTree, ynaIds } from "../enums";
import {
    IYnaData,
    IYnaTree,
    IYnaRunner,
    IYnaOptionsBase,
    IYnaRunnerOptions
} from "../interfaces";
import {
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
    constructor(
        commands: ynaCommandMap,
        keys: ynaKeyMap,
        options: IYnaRunnerOptions,
        data: IYnaData
    ) {
        super("RUNNER", options, data);
        this.commands = commands;
        this.keys = keys;
        this.transformer = transformerDefault;
    }
    public execItem(
        item: ynaTree,
        transformerCustom?: ynaCommandTransformer
    ): string {
        const itemId: any = item[0];
        const itemContent: any = item.slice(1);
        let result: string;
        let resultType: string;

        /**
         * Binds custom transformer
         */
        if (transformerCustom) {
            this.transformer = transformerCustom;
        }

        if (itemId === IDS.key) {
            // Key
            const keyName = this.execItem(itemContent[0]);

            result = this.resolveKey(keyName);
            resultType = "key";
        } else if (itemId === IDS.command) {
            // Command
            const commandName = this.execItem(itemContent[0]);
            const commandArgs = itemContent[1];

            result = this.resolveCommand(commandName, commandArgs);
            resultType = "command";
        } else if (itemId === IDS.comment) {
            // Comment (ignored)
            result = "";
            resultType = "comment";
        } else if (isArray(item)) {
            // Array
            const str = this.execArr(<IYnaTree>item).join("");

            result = this.transformer(str);
            resultType = "array";
        } else {
            // String
            result = <string>item;
            resultType = "string";
        }

        /**
         * Unbinds custom transformer
         */
        if (transformerCustom) {
            this.transformer = transformerDefault;
        }

        this.log(["item", resultType], result);

        return result;
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
