"use strict";

module.exports = function (item) {
    const _this = this;

    if (item.type === "key") { //Key
        return _this.execKey(item.name);
    } else if (item.type === "command") { //Command
        return _this.execCommand(item.name, item.data);
    } else if (item instanceof Array) {
        return _this.execArray(item);
    } else {
        return item;
    }
};
