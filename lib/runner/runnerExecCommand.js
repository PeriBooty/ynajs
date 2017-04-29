"use strict";

const stringifyError = require("../util/stringifyError");
const stringifyVal = require("../util/stringifyVal");

/**
 * Accesses and runs a command
 * @param {String} name
 * @param {Array} data
 * @returns {String}
 */
module.exports = function (name, data) {
    const _this = this;

    if (_this.commands.has(name)) {
        const command = _this.commands.get(name);
        const result = command.call(_this, data);

        return stringifyVal(name, result);
    } else {
        return stringifyError(name, new Error("unknown command"));
    }
};
