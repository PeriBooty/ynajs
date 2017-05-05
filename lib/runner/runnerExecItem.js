"use strict";

const _isArray = require("lodash/isArray");
const transformerOneline = require("../util/transformerOneline");

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
    const isOneline = itemContent[0] === "oneline";
    let result;
    let resultType;

    /**
     * Oneline specific transformer switch
     */
    if (isOneline) {
        _this.transformer = transformerOneline;
    }

    if (itemFlag === ids.key) { //Key
        const keyName = _this.execItem(itemContent[0]);

        result = _this.transformer(_this.resolveKey(keyName));
        resultType = "key";
    } else if (itemFlag === ids.command) { //Command
        const commandName = _this.execItem(itemContent[0]);
        const commandArgs = itemContent[1];

        result = _this.resolveCommand(commandName, commandArgs);
        resultType = "command";
    } else if (itemFlag === ids.comment) { //Comment (ignored)
        result = "";
        resultType = "comment";
    } else if (_isArray(item)) { //Array
        result = _this.execArr(item).join("");
        resultType = "array";
    } else { //String
        result = item;
        resultType = "string";
    }

    /**
     * Oneline specific transformer switch restore
     */
    if (isOneline) {
        _this.transformer = str => str;
    }


    _this.log(["item", resultType], result);

    return result;
};
