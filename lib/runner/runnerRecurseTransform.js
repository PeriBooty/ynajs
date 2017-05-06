"use strict";

const _isArray = require("lodash/isArray");
const _isNumber = require("lodash/isNumber");

module.exports = function recurseTransform(item, transformer) {
    const _this = this;
    const itemFlag = item[0];
    let itemContent = item.slice(1);
    let result;

    if (_isNumber(itemFlag)) {
        itemContent = itemContent.map(sub => recurseTransform(sub, transformer));

        result = [itemFlag, ...itemContent];
    } else if (_isArray(item)) {
        result = itemContent.map(sub => recurseTransform(sub, transformer));
    } else {
        result = transformer(item);
    }
    console.log("---------");
    console.log({
        item,
        result
    });

    return result;
};
