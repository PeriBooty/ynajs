"use strict";

/* eslint no-console: "off" */

/**
 * Base class
 *
 * @class
 */
module.exports = class {
    /**
     * Base constructor
     *
     * @constructor
     * @param {string} name
     * @param {Object} options
     * @param {Object} data
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
