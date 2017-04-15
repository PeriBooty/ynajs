"use strict";

/**
 * parses command into command object
 * @param {String} str
 * @returns {Object}
 */
module.exports = function (str) {
    const _this = this;
    const treeControl = _this.controlChars;
    let result = "";
    let resultType = "null";

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
        console.log(_this.options);
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
        const dataIndex = str.includes(treeControl.data) ? str.indexOf(treeControl.data) : str.length - 1;

        result = {
            type: "command",
            name: str.substring(0, dataIndex),
            data: _this.parseCommandData(str.substr(dataIndex + 1, str.length - 1))
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
