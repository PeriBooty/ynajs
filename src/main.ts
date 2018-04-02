import { objDefaults, objDefaultsDeep } from "lightdash";
import initCommands from "./init/initCommands";
/* const initKeys = require("./lib/init/initKeys"); */
/* const YnaParser = require("./lib/parser"); */
/* const YnaRunner = require("./lib/runner"); */
import { IYna, IYnaData, IYnaOptions, IYnaRunnerOptions } from "./interfaces";
import { ynaCommandFnMap } from "./types";

const optionsDefault: IYnaOptions = {
    debug: false,
    loadJSON: false
};
const optionsRunnerDefault: IYnaRunnerOptions = {
    debug: false,
    depth: 0 // Used for recursion depth checks
};
const dataDefault: IYnaData = {};

/**
 * YNA instance class
 *
 * @class
 */
const Yna = class {
    public tree: any;
    public commands: ynaCommandFnMap;
    public keys: any;
    /**
     * YNA instance constructor
     *
     * @param {string} yna
     * @param {Object} [options={}]
     * @param {Object} [data={}]
     */
    constructor(yna: string, options: object = {}, data: object = {}) {
        const optionsMerged = objDefaultsDeep(options, optionsDefault);
        const dataMerged = objDefaultsDeep(data, dataDefault);

        this.commands = initCommands();
        /*         if (options.loadJSON) {
            this.tree = yna;
        } else {
            const parser = new YnaParser(optionsMerged, dataMerged);

            this.tree = parser.parseString(yna);
        } */
    }
    /**
     * Adds a new command to the instance command map
     *
     * @param {string} name
     * @param {function} fn
     */
    public addCommand(name: string, fn: any): void {
        /*    this.commandMap.set(name, fn); */
    }
    /**
     * Runs the yna instance and returns the results
     *
     * @param {Array<string>} [args=[]]
     * @param {Object} [ctx={}]
     * @param {Object} [options={}]
     * @param {Object} [data={}]
     * @returns {string}
     */
    public run(
        args: any[] = [],
        ctx: object = {},
        options: object = {},
        data: object = {}
    ): string {
        /*         const optionsMerged = objDefaultsDeep(options, optionsRunnerDefault);
        const dataMerged = objDefaults(data, dataDefault);
        const keyMap = initKeys(args, ctx);
        const runner = new YnaRunner(
            this.commandMap,
            keyMap,
            optionsMerged,
            dataMerged
        );

        return runner.execItem(this.tree); */
        return "";
    }
};

export default Yna;
