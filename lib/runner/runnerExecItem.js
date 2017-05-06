"use strict";

const _isArray = require("lodash/isArray");
const transformerDefault = require("./transformer/default");

/**
 * Executes a single item
 * @param {Mixed} item
 * @returns {String}
 */
module.exports = function (item, transformerCustom = null) {
    const _this = this;
    const ids = _this.lang.ids;
    const itemFlag = item[0];
    const itemContent = item.slice(1);
    let result;
    let resultType;

    if (transformerCustom) {
        _this.transformer = transformerCustom;
    }


    if (itemFlag === ids.key) { //Key
        const keyName = _this.execItem(itemContent[0]);

        result = _this.resolveKey(keyName);
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
        const arrResult = _this.execArr(item).join("");

        result = _this.transformer(arrResult);
        resultType = "array";
    } else { //String
        result = item;
        resultType = "string";
    }


    if (transformerCustom) {
        _this.transformer = transformerDefault;
    }

    _this.log(["item", resultType], result);

    return result;
};
