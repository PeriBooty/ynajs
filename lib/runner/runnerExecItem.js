"use strict";

/**
 * Executes a single item
 * @param {Mixed} item
 * @returns {String}
 */
module.exports = function (item) {
    const _this = this;
    let result = "";
    let resultType = "null";

    if (typeof item === "string") { //String
        result = item;
        resultType = "string";
    } else if (item instanceof Array) { //Array
        result = _this.execArr(item).join("");
        resultType = "array";
    } else if (item.type === "key") { //Key
        result = _this.execKey(item.name);
        resultType = "key";
    } else if (item.type === "command") { //Command
        result = _this.execCommand(item.name, item.data);
        resultType = "command";

        return result;
    }

    _this.log(["item", resultType], result);

    return result;
};
