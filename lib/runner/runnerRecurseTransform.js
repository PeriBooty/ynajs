"use strict";

const _isArray = require("lodash/isArray");
const _isNumber = require("lodash/isNumber");

module.exports = function (item, transformer) {
    const _this = this;
    const ids = _this.lang.ids;
    const itemFlag = item[0];
    let itemContent = item.slice(1);
    let result;

    if (_isNumber(itemFlag)) {
        if (itemFlag !== ids.key) {
            itemContent = itemContent.map(sub => _this.recurseTransform(sub, transformer));
        }

        result = [itemFlag, ...itemContent];
    } else if (_isArray(item)) {
        result = item.map(sub => _this.recurseTransform(sub, transformer));
    } else {
        result = transformer(item);
    }
    console.log("---------");
    console.log({
        isKey:itemFlag === ids.key,
        item,
        result
    });

    return result;
};
