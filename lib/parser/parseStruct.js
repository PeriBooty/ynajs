"use strict";

const stringifyError = require("../util/stringifyError");

/**
 * parses command into command object
 * @param {String} str
 * @returns {Object}
 */
module.exports = function (str) {
    const _this = this;
    const control = _this.lang.control;
    const ids = _this.lang.ids;
    let result;
    let resultType;

    /**
     * Flow:
     * Is Comment -> return empty
     * Is Escaped -> return string
     * Is Command -> recurse into parseString and return command object
     * Is Key -> return key object
     */
    if (str.startsWith(control.content.comment)) { //Comment
        result = [ids.comment, str.replace(control.content.comment, "")];
        resultType = "comment";
    } else if (str.startsWith(control.content.escape)) { //Escaped
        const escapedText = control.tree.open + str.replace(control.content.escape, "") + control.tree.close;

        result = [ids.string, escapedText];
        resultType = "escaped";
    } else if (str.includes(control.content.delimiter)) { //Command
        let commandData;

        if (!str.trim().endsWith(control.content.delimiter)) {
            commandData = stringifyError("parser", new Error("missing semicolons"));
        } else {
            commandData = _this.parseStructData(str);
        }

        result = [ids.command, commandData];
        resultType = "command";
    } else { //Key
        result = [ids.key, str];
        resultType = "key";
    }

    _this.log(["struct", resultType], result);

    return result;
};
