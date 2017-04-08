"use strict";

const treeControl = require("./constants");
const getCommandData = require("./getCommandData");

/**
 * parses command into command object
 * @param {String} str
 * @returns {Object}
 */
module.exports = function (strFull) {
    const str = strFull.substring(1, strFull.length - 1); //drop start and end braces
    const contentIndex = str.indexOf(treeControl.content);

    if (contentIndex !== -1) { //Command
        return {
            type: "command",
            name: str.substring(0, contentIndex),
            data: getCommandData(str, contentIndex)
        };
    } else if (str.startsWith(treeControl.comment)) { //Comment
        //Dont parse comments for now
        return "";
    } else { //Key
        return {
            type: "key",
            name: str
        };
    }
};
