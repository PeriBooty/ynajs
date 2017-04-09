"use strict";

const exec = function (arr, keys, commands) {
    const execKey = require("./exec/execKey");
    const execCommand = require("./exec/execCommand");
    const result = [];

    arr.forEach(item => {
        let itemProcessed = null;

        if (typeof item === "string") {
            itemProcessed = item;
        } else if (typeof item === "object") {
            if (item.type === "key") {
                itemProcessed = execKey(item, keys);
            } else if (item.type === "command") {
                itemProcessed = execCommand(item, exec, keys, commands);
            }
        }

        result.push(itemProcessed);
    });


    return result.join("");
};

module.exports = function (tree, keys, commands) {
    return exec(tree, keys, commands);
};
