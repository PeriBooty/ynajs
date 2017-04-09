"use strict";

module.exports = function (item, exec, keys, commands) {
    const key = item.name;

    if (commands.has(key)) {
        const command = commands.get(key);
        const result = command(item.data, exec, keys, commands);

        return String(result);
    } else {
        return new Error(`command '${key}' not found`);
    }
};
