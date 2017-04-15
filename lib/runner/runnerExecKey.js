"use strict";

const stringifyError = require("../util/stringifyError");
const stringifyVal = require("../util/stringifyVal");

/**
 * Accesses and returns a key
 * @param {String} name
 * @returns {String}
 */
module.exports = function (name) {
    const _this = this;

    if (_this.keys.has(name)) {
        const key = _this.keys.get(name);
        const result = typeof key === "function" ? key() : key;

        return stringifyVal(name, result);
    } else {
        return stringifyError("key", new Error(`'${name}' not found`));
    }
};
