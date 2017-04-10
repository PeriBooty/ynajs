"use strict";

module.exports = function (name) {
    const _this = this;

    if (_this.keys.has(name)) {
        const key = _this.keys.get(name);
        const result = typeof key === "function" ? key() : key;

        console.log("EXEC.key: " + name, result);

        return String(result);

    } else {
        throw new Error(`key '${name}' not found`);
    }
};
