"use strict";

module.exports = function (item) {
    const _this = this;

    if (typeof item === "string") { //Key
        if (_this.debug) {
            console.log("EXEC.item.string", item);
        }

        return item;
    } else if (item instanceof Array) {
        const result = _this.execArray(item);

        if (_this.debug) {
            console.log("EXEC.item.array", result);
        }

        return result;
    } else if (item.type === "key") { //Key
        const result = _this.execKey(item.name);

        if (_this.debug) {
            console.log("EXEC.item.key", result);
        }

        return result;
    } else if (item.type === "command") { //Command
        const result = _this.execCommand(item.name, item.data);

        if (_this.debug) {
            console.log("EXEC.item.command", result);
        }

        return result;
    } else {
        if (_this.debug) {
            console.log("EXEC.item.other", item);
        }

        return item;
    }
};
