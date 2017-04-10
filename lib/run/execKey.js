"use strict";

module.exports = function (name, keys) {
    if (keys.has(name)) {
        const key= keys.get(name);
        const result = typeof key === "function" ? key() : key;

        console.log("EXEC.key: " + name, result);

        return String(result);

    } else {
        throw new Error(`key '${name}' not found`);
    }
};
