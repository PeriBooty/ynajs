"use strict";

const _has = require("lodash/has");
const _get = require("lodash/get");
const _isFunction = require("lodash/isFunction");
const _isPlainObject = require("lodash/isPlainObject");
const stringifyError = require("../util/stringifyError");
const stringifyVal = require("../util/stringifyVal");

/**
 * Accesses and returns a key
 * @param {String} name
 * @returns {String}
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

            if (_has(entry, pathRest)) {
                resolved = _get(entry, pathRest);
            } else {
                return stringifyError(name, new Error(`does not have '${pathRest}'`));
            }
        }

        if (_isFunction(resolved)) {
            result = resolved();
        } else if (_isPlainObject(resolved)) {
            result = resolved.__default;
        } else {
            result = resolved;
        }

        return stringifyVal(name, result);
    } else {
        return stringifyError(name, new Error("unknown key"));
    }
};
