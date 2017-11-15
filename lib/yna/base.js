"use strict";

/* eslint no-console: "off" */

/**
 * Parser class
 *
 * @class
 */
module.exports = class {
    /**
     * Parser constructor
     *
     * @constructor
     * @param {Object} options
     */
    constructor(name, options, data) {
        this.name = name;
        this.options = options;
        this.data = data;
    }
    log(arr, data) {
        if (this.options.debug) {
            const path = [this.name];

            path.push(...arr);

            console.log(path.join("."), "\n", data, "\n");
        }
    }
};
