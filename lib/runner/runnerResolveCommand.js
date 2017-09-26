"use strict";

const stringifyError = require("../util/stringifyError");
const stringifyVal = require("../util/stringifyVal");

/**
 * Accesses and runs a command
 *
 * @param {string} name
 * @param {Array<any>} data
 * @returns {string}
 */
module.exports = function (name, data) {
    if (this.commands.has(name)) {
        const command = this.commands.get(name);
        const result = command.call(this, data);

        return stringifyVal(name, result);
    } else {
        return stringifyError(name, new Error("unknown command"));
    }
};
