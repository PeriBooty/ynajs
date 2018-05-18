import { isObject, objDefaults, objDefaultsDeep } from "lightdash";
import YnaParser from "./classes/parser";
import YnaRunner from "./classes/runner";
import { dataDefault, optionsDefault } from "./defaults";
import initCommands from "./init/initCommands";
import initKeys from "./init/initKeys";
import { IYna, IYnaData, IYnaOptions } from "./interfaces";
import { ynaCommand, ynaCommandMap, ynaKeyMap, ynaTree } from "./types";

/**
 * Yna Class
 *
 * @public
 * @class
 */
const Yna = class {
    public tree: string | ynaTree;
    public commands: ynaCommandMap;
    /**
     * Yna Class constructor
     *
     * @public
     * @constructor
     * @param {string|ynaTree} yna
     * @param {object} options
     * @param {object} data
     */
    constructor(
        yna: string | ynaTree,
        options: object = {},
        data: object = {}
    ) {
        const optionsMerged = <IYnaOptions>objDefaultsDeep(
            options,
            optionsDefault
        );
        const dataMerged = <IYnaData>objDefaultsDeep(data, dataDefault);

        this.commands = initCommands();
        if (isObject(yna)) {
            this.tree = yna;
        } else {
            this.tree = new YnaParser(optionsMerged, dataMerged).parseString(
                <string>yna
            );
        }
    }
    /**
     * Registers a new command to the command map
     *
     * @public
     * @param {string} name
     * @param {ynaCommand} fn
     */
    public addCommand(name: string, fn: ynaCommand): void {
        this.commands.set(name, fn);
    }
    /**
     * Executes yna command and returns result
     *
     * @public
     * @param {string[]} args
     * @param {object} ctx
     * @param {object} options
     * @param {object} data
     * @returns {string}
     */
    public run(
        args: string[] = [],
        ctx: object = {},
        options: object = {},
        data: object = {}
    ): string {
        const optionsMerged = <IYnaOptions>objDefaultsDeep(
            options,
            optionsDefault
        );
        const dataMerged = <IYnaData>objDefaults(data, dataDefault);
        const keyMap = initKeys(args, ctx);

        return new YnaRunner(
            this.commands,
            keyMap,
            optionsMerged,
            dataMerged
        ).execItem(this.tree);
    }
};

export default Yna;
