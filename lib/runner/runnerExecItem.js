"use strict";

const _isArray = require("lodash/isArray");
const transformerDefault = require("./transformer/default");

/**
 * Executes a single item
 * @param {Mixed} item
 * @returns {String}
 */
module.exports = function (item, transformerCustom = null) {
    const ids = this.lang.ids;
    const itemFlag = item[0];
    const itemContent = item.slice(1);
    let result;
    let resultType;

    /**
     * Binds custom transformer
     */
    if (transformerCustom) {
        this.transformer = transformerCustom;
    }

    if (itemFlag === ids.key) { //Key
        const keyName = this.execItem(itemContent[0]);

        result = this.resolveKey(keyName);
        resultType = "key";
    } else if (itemFlag === ids.command) { //Command
        const commandName = this.execItem(itemContent[0]);
        const commandArgs = itemContent[1];

        result = this.resolveCommand(commandName, commandArgs);
        resultType = "command";
    } else if (itemFlag === ids.comment) { //Comment (ignored)
        result = "";
        resultType = "comment";
    } else if (_isArray(item)) { //Array
        result = this.transformer(this.execArr(item).join(""));
        resultType = "array";
    } else { //String
        result = item;
        resultType = "string";
    }

    /**
     * Unbinds custom transformer
     */
    if (transformerCustom) {
        this.transformer = transformerDefault;
    }

    this.log(["item", resultType], result);

    return result;
};
