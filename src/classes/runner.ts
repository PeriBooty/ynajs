import {
    getPath,
    hasPath,
    isArray,
    isFunction,
    isObjectPlain
} from "lightdash";
import { ynaControlData, ynaControlTree, ynaIds } from "../enums";
import { IYnaData, IYnaOptions, IYnaRunner, IYnaTree } from "../interfaces";
import {
    ynaCommand,
    ynaCommandMap,
    ynaCommandTransformer,
    ynaKeyMap,
    ynaTree
} from "../types";
import { stringifyError, stringifyVal } from "../types/stringify";
import YnaLogger from "./logger";

const transformerDefault: ynaCommandTransformer = (str: string): string => str;

const YnaRunner = class extends YnaLogger implements IYnaRunner {
    public transformer: ynaCommandTransformer;
    public commands: ynaCommandMap;
    public keys: ynaKeyMap;
    public depth: number;
    constructor(
        commands: ynaCommandMap,
        keys: ynaKeyMap,
        options: IYnaOptions,
        data: IYnaData
    ) {
        super("RUNNER", options, data);
        this.depth = 0;
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

        if (itemId === ynaIds.key) {
            // Key
            const keyName = this.execItem(itemContent[0]);

            result = this.resolveKey(keyName);
            resultType = "key";
        } else if (itemId === ynaIds.command) {
            // Command
            const commandName = this.execItem(itemContent[0]);
            const commandArgs = itemContent[1];

            result = this.resolveCommand(commandName, commandArgs);
            resultType = "command";
        } else if (itemId === ynaIds.comment) {
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
        const result = itemArr.map(item => this.execItem(item));

        this.log(["array"], result);

        return result;
    }
    public resolveCommand(name: string, tree: IYnaTree): string {
        if (!this.commands.has(name)) {
            return stringifyError(name, new Error("unknown command"));
        }

        const command = <ynaCommand>this.commands.get(name);
        const result = command(this, tree);

        return stringifyVal(result, name);
    }
    public resolveKey(name: string): string {
        const path = name.split(ynaControlData.prop);

        if (!this.keys.has(path[0])) {
            return stringifyError(name, new Error("unknown key"));
        }

        // First level check
        const entry = this.keys.get(path[0]);
        let resolved = entry;
        let result;

        if (path.length > 1) {
            // Only enter if more than one prop in path
            const pathRest = path.slice(1);

            if (!hasPath(entry, pathRest)) {
                return stringifyError(
                    name,
                    new Error(`does not have '${pathRest}'`)
                );
            }

            resolved = getPath(entry, pathRest);
        }

        if (isFunction(resolved)) {
            result = resolved();
        } else if (isObjectPlain(resolved)) {
            result = resolved.__default;
        } else {
            result = resolved;
        }
        return stringifyVal(result, name);
    }
};

export default YnaRunner;
