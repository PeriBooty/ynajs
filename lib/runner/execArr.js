"use strict";

module.exports = function (arr) {
    const _this = this;
    const result = arr.map(item => {
        let itemProcessed = item;

        if (item.type === "key") { //Key
            itemProcessed = _this.execKey(item.name);
        } else if (item.type === "command") { //Command
            itemProcessed = _this.execCommand(item.name, item.data);
        } else {

        }

        return itemProcessed;
    });

    //console.log({arr, result});

    return result;
};
