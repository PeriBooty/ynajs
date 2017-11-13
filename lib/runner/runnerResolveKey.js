"use strict";

const {
    hasPath,
    getPath,
    isFunction,
    isObjectPlain
} = require("lightdash");
const stringifyError = require("../util/stringifyError");
const stringifyVal = require("../util/stringifyVal");

/**
 * Accesses and returns a key
 *
 * @param {string} name
 * @returns {string}
 */
module.exports = function (name) {
    const control = this.lang.control;
    const path = name.split(control.data.prop);

    /**
     * resolve props
     */
    if (this.keys.has(path[0])) { //First level check
        const entry = this.keys.get(path[0]);
        let resolved = entry;
        let result;

        if (path.length > 1) { //Only enter if more than one prop in path
            const pathRest = path.slice(1);

            if (hasPath(entry, pathRest)) {
                resolved = getPath(entry, pathRest);
            } else {
                return stringifyError(name, new Error(`does not have '${pathRest}'`));
            }
        }

        if (isFunction(resolved)) {
            result = resolved();
        } else if (isObjectPlain(resolved)) {
            result = resolved.__default;
        } else {
            result = resolved;
        }

        return stringifyVal(name, result);
    } else {
        return stringifyError(name, new Error("unknown key"));
    }
};
