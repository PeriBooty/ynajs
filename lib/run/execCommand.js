"use strict";

module.exports = function (name, data, exec, keys, commands) {

    if (commands.has(name)) {
        const command = commands.get(name);
        const result = command(data, exec, keys, commands);

        console.log("EXEC.command: " + name, result);

        return String(result);
    } else {
        throw new Error(`command '${name}' not found`);
    }
};
