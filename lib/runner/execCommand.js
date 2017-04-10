"use strict";

module.exports = function (name, data) {
    const _this = this;

    if (_this.commands.has(name)) {
        const command = _this.commands.get(name);
        const result = command.call(_this, data);

        console.log("EXEC.command: " + name, result);

        return String(result);
    } else {
        throw new Error(`command '${name}' not found`);
    }
};
