'use strict';

var lightdash = require('lightdash');

const optionsDefault = {
    debug: false,
    loadJSON: false
};
const dataDefault = {};
/**
 * YNA instance class
 *
 * @class
 */
const Yna = class {
    /**
     * YNA instance constructor
     *
     * @param {string} yna
     * @param {Object} [options={}]
     * @param {Object} [data={}]
     */
    constructor(yna, options = {}, data = {}) {
        const optionsMerged = lightdash.objDefaultsDeep(options, optionsDefault);
        const dataMerged = lightdash.objDefaultsDeep(data, dataDefault);
        /*     this.commandMap = initCommands(optionsMerged); */
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
    addCommand(name, fn) {
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
    run(args = [], ctx = {}, options = {}, data = {}) {
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

module.exports = Yna;
