"use strict";

const {
    objDefaults,
    objDefaultsDeep
} = require("lightdash");
const initCommands = require("./lib/init/initCommands");
const initKeys = require("./lib/init/initKeys");
const YnaParser = require("./lib/parser");
const YnaRunner = require("./lib/runner");

const optionsDefault = {
    debug: false,
    loadJSON: false
};
const optionsRunnerDefault = {
    debug: false,
    depth: 0
};
const dataDefault = {};

/**
 * YNA command class
 *
 * @class
 */
module.exports = class {
    /**
     * Command constructor
     *
     * @param {string} yna
     * @param {Object} [options={}]
     * @param {Object} [data={}]
     */
    constructor(yna, options = {}, data = {}) {
        const optionsMerged = objDefaultsDeep(options, optionsDefault);
        const dataMerged = objDefaultsDeep(data, dataDefault);

        this.commandMap = initCommands(optionsMerged);

        if (options.loadJSON) {
            this.tree = yna;
        } else {
            const parser = new YnaParser(optionsMerged, dataMerged);

            this.tree = parser.parseString(yna);
        }
    }
    /**
     * Adds a new command to the instance container
     *
     * @param {string} name
     * @param {function} fn
     */
    addCommand(name, fn) {
        this.commandMap.set(name, fn);
    }
    /**
     * Runs command
     *
     * @param {Array<string>} [args=[]]
     * @param {Object} [ctx={}]
     * @param {Object} [options={}]
     * @param {Object} [data={}]
     * @returns {string}
     */
    run(args = [], ctx = {}, options = {}, data = {}) {
        const optionsMerged = objDefaultsDeep(options, optionsRunnerDefault);
        const dataMerged = objDefaults(data, dataDefault);
        const runner = new YnaRunner(this.commandMap, initKeys(args, ctx), optionsMerged, dataMerged);

        return runner.execItem(this.tree);
    }
};
