"use strict";

const _has = require("lodash/has");
const _get = require("lodash/get");
const stringifyError = require("../util/stringifyError");
const stringifyVal = require("../util/stringifyVal");

/**
 * Accesses and returns a key
 * @param {String} name
 * @returns {String}
 */
module.exports = function (name) {
    const _this = this;
    const controlChars = _this.controlChars;
    const path = name.split(controlChars.prop);

    if (_this.keys.has(path[0])) {
        const entry = _this.keys.get(path[0]);
        let result = entry;

        if (path.length > 1) {
            const pathRest = path.slice(1);

            if (_has(entry, pathRest)) {
                const target = _get(entry, pathRest);

                result = typeof target === "function" ? target() : target;
            } else {
                return stringifyError("subkey", new Error(`'${pathRest}' could not be resolved`));
            }
        }

        return stringifyVal(name, result);
    } else {
        return stringifyError("key", new Error("unknown key"));
    }
};
