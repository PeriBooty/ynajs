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

    /**
     * Flow:
     * Is Comment? -> return empty
     * Is Escaped? -> return string
     * Is Command? ->
     *      Has data? -> recurse into parseString and return command object
     *      Else return name command
     * Is Key? -> return key object
     */
    if (str.startsWith(treeControl.comment)) { //Comment
        return ""; //Dont parse comments for now
    } else if (str.startsWith(treeControl.escape)) { //Escaped
        return strFull.replace(treeControl.escape, "");
    } else if (str.includes(treeControl.delimiter)) { //Command

        if (str.includes(treeControl.content)) { //Has data
            const contentIndex = str.indexOf(treeControl.content);

            return {
                type: "command",
                name: str.substring(0, contentIndex),
                data: getCommandData(str, contentIndex)
            };
        } else {//No data
            return {
                type: "command",
                name: str.substring(0, str.length - 1),
                data: []
            };
        }

    } else { //Key
        return {
            type: "key",
            name: str
        };
    }
};
