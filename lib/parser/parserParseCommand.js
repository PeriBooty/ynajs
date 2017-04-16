"use strict";

const stringifyError = require("../util/stringifyError");

/**
 * parses command into command object
 * @param {String} str
 * @returns {Object}
 */
module.exports = function (str) {
    const _this = this;
    const treeControl = _this.controlChars;
    let result;
    let resultType;

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
        if (!_this.options.dropComments) {
            result = {
                type: "comment",
                data: str
            };
        }
        resultType = "comment";
    } else if (str.startsWith(treeControl.escape)) { //Escaped
        result = str.replace(treeControl.escape, "");
        resultType = "escaped";
    } else if (str.includes(treeControl.delimiter)) { //Command
        const hasDataOpen = str.includes(treeControl.data);
        const indexDataStart = hasDataOpen ? str.indexOf(treeControl.data) : str.indexOf(treeControl.delimiter);
        const commandName = str.substr(0, indexDataStart);
        const commandDataString = str.substr(indexDataStart + Number(hasDataOpen));
        let commandData;

        if (!str.endsWith(treeControl.delimiter)) {
            commandData = [stringifyError("parser", new Error("missing semicolons"))];
        } else {
            commandData = _this.parseCommandData(commandDataString);
        }

        result = {
            type: "command",
            name: commandName,
            data: commandData
        };
        resultType = "command";
    } else { //Key
        result = {
            type: "key",
            name: str
        };
        resultType = "key";
    }

    _this.log(["command", resultType], result);

    return result;
};
