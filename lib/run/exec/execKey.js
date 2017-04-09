"use strict";

module.exports = function (item, keys) {
    const key = item.name;

    if (keys.has(key)) {
        return String(keys.get(key));
    } else {
        return new Error(`key '${key}' not found`);
    }
};
