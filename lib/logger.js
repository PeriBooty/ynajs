"use strict";

/* eslint no-console: "off" */

/**
 * YnaLogger class that parser and runner are based on
 *
 * @class
 */
module.exports = class {
    /**
     * YnaLogger constructor
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
            const path = [this.name, ...arr].join("->");

            console.log(`${path}: ${JSON.stringify(data)}`);
        }
    }
};
