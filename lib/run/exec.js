"use strict";

const exec = function (arr, keys, commands) {
    const execKey = require("./execKey");
    const execCommand = require("./execCommand");

    //console.log("EXEC", arr);

    return arr.map(item => {
        let itemProcessed = item;

        if (item instanceof Array) { //Subarray
            itemProcessed = exec(item, keys, commands).join("");
        } else if (item.type === "key") { //Key
            itemProcessed = execKey(item.name, keys);
        } else if (item.type === "command") { //Command
            itemProcessed = execCommand(item.name, item.data, exec, keys, commands);
        }

        return itemProcessed;
    });
};

module.exports = function (tree, keys, commands) {
    return exec(tree, keys, commands).join("");
};
