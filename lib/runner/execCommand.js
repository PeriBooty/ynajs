"use strict";

const stringifyError = require("../util/stringifyError");
const stringifyVal = require("../util/stringifyVal");

module.exports = function (name, data) {
    const _this = this;

    if (_this.commands.has(name)) {
        const command = _this.commands.get(name);
        const result = command.call(_this, data);

        return stringifyVal(name, result);
    } else {
        return stringifyError("command", new Error(`command '${name}' not found`));
    }
};
