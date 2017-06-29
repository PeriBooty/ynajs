"use strict";

const parse = require("./lib/parser");
const run = require("./lib/runner");
const initCommands = require("./lib/init/initCommands");
const initKeys = require("./lib/init/initKeys");

/**
 * YNA command class
 * @class
 */
module.exports = class {
    /**
     * Command contructor
     * @param {String} yna
     * @param {Object} [options={}]
     */
    constructor(yna, options = {}) {
        this.tree = parse(yna, options);
        this.commandMap = initCommands();
    }
    /**
     * Adds a new command to the instance container
     * @param {String} name
     * @param {Function} fn
     */
    addCommand(name, fn) {
        this.commandMap.set(name, fn);
    }
    /**
     * Runs command
     * @param {Array} [args=[]]
     * @param {Object} [ctx={}]
     * @param {Object} [options={}]
     * @returns {String}
     */
    run(args = [], ctx = {}, options = {}) {
        const keyMap = initKeys(args, ctx);

        return run(this.tree, this.commandMap, keyMap, options);
    }
};
