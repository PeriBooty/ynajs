"use strict";

const _isArray = require("lodash/isArray");

/**
 * Executes a single item
 * @param {Mixed} item
 * @returns {String}
 */
module.exports = function (item) {
    const _this = this;
    const ids = _this.lang.ids;
    const itemFlag = item[0];
    const itemContent = item.slice(1);
    let result = "";
    let resultType = "null";

    if (itemFlag === ids.string) { //String
        result = _this.execArr(itemContent).join("");
        resultType = "string";
    } else if (itemFlag === ids.key) { //Key
        result = _this.execKey(itemContent[0]);
        resultType = "key";
    } else if (itemFlag === ids.command) { //Command
        result = _this.execCommand(itemContent[0], itemContent[1]);
        resultType = "command";
    } else if (itemFlag === ids.comment) { //Command
        result = "";
        resultType = "comment";
    } else if (_isArray(item)) { //Array
        result = _this.execArr(item).join("");
        resultType = "array";
    } else {
        result = item;
        resultType = "unkown";
    }

    _this.log(["item", resultType], result);

    return result;
};
