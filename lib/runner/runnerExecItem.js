"use strict";

const _isString = require("lodash/isString");
const _isArray = require("lodash/isArray");
const _isPlainObject = require("lodash/isPlainObject");

/**
 * Executes a single item
 * @param {Mixed} item
 * @returns {String}
 */
module.exports = function (item) {
    const _this = this;
    let result = "";
    let resultType = "null";

    if (_isString(item)) { //String
        result = item;
        resultType = "string";
    } else if (_isArray(item)) { //Array
        result = _this.execArr(item).join("");
        resultType = "array";
    } else if (_isPlainObject(item)) {
        if (item.type === "key") { //Key
            result = _this.execKey(item.name);
            resultType = "key";
        } else if (item.type === "command") { //Command
            result = _this.execCommand(item.name, item.data);
            resultType = "command";
        }
    } else {
        result = item;
        resultType = "unkown";
    }

    _this.log(["item", resultType], result);

    return result;
};
