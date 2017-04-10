"use strict";

module.exports = function (name, keys) {
    if (keys.has(name)) {
        const result = keys.get(name);

        console.log("EXEC.key: " + name, result);

        return String(result);

    } else {
        throw new Error(`key '${name}' not found`);
    }
};
