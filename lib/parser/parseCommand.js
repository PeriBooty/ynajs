"use strict";

/**
 * parses command into command object
 * @param {String} str
 * @returns {Object}
 */
module.exports = function (str) {
    const _this = this;
    const treeControl = _this.controlChars;

    //console.log(str);

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
        const result = "";

        if (_this.debug) {
            console.log("PARSE.command.comment", result);
        }

        return result; //Dont parse comments for now
    } else if (str.startsWith(treeControl.escape)) { //Escaped
        const result = str.replace(treeControl.escape, "");

        if (_this.debug) {
            console.log("PARSE.command.escaped", result);
        }

        return result;
    } else if (str.includes(treeControl.delimiter)) { //Command
        const dataIndex = str.includes(treeControl.data) ? str.indexOf(treeControl.data) : str.length - 1;
        const result = {
            type: "command",
            name: str.substring(0, dataIndex),
            data: _this.parseCommandData(str.substr(dataIndex + 1))
        };

        if (_this.debug) {
            console.log("PARSE.command.command", result);
        }

        return result;
    } else { //Key
        const result = {
            type: "key",
            name: str
        };

        if (_this.debug) {
            console.log("PARSE.command.key", result);
        }

        return result;
    }
};
