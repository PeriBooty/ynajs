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

    /**
     * Flow:
     * Is Comment? -> return empty
     * Is Escaped? -> return string
     * Is Command? -> recurse into parseString and return command object
     * Is Key? -> return key object
     */
    if (str.startsWith(treeControl.comment)) { //Comment
        return ""; //Dont parse comments for now
    } else if (str.startsWith(treeControl.escape)) { //Escaped
        return strFull.replace(treeControl.escape,""); //return full string
    } else if (contentIndex !== -1) { //Command
        return {
            type: "command",
            name: str.substring(0, contentIndex),
            data: getCommandData(str, contentIndex)
        };
    } else { //Key
        return {
            type: "key",
            name: str
        };
    }
};
