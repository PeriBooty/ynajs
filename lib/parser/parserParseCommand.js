"use strict";

const stringifyError = require("../util/stringifyError");

/**
 * parses command into command object
 * @param {String} str
 * @returns {Object}
 */
module.exports = function (str) {
    const _this = this;
    const controlChars = _this.controlChars;
    let result;
    let resultType;

    /**
     * Flow:
     * Is Comment -> return empty
     * Is Escaped -> return string
     * Is Command -> recurse into parseString and return command object
     * Is Key -> return key object
     */
    if (str.startsWith(controlChars.comment)) { //Comment
        if (!_this.options.dropComments) {
            result = {
                type: "comment",
                data: str
            };
        } else {
            result = "";
        }
        resultType = "comment";
    } else if (str.startsWith(controlChars.escape)) { //Escaped
        result = "{" + str.substr(1) + "}"; //Command without escape char
        resultType = "escaped";
    } else if (str.includes(controlChars.delimiter)) { //Command
        const hasDataOpen = str.includes(controlChars.data);
        const indexDataStart = hasDataOpen ? str.indexOf(controlChars.data) : str.indexOf(controlChars.delimiter);
        const commandName = str.substr(0, indexDataStart);
        const commandDataString = str.substr(indexDataStart);
        let commandData;

        if (!str.trim().endsWith(controlChars.delimiter)) {
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
