"use strict";

/**
 * parses command into command object
 * @param {String} str
 * @returns {Object}
 */
module.exports = function (str) {
    const _this = this;
    const control = _this.lang.control;
    const ids = _this.lang.ids;
    const strTrimmed = str.trim();
    let result;
    let resultType;

    /**
     * Flow:
     * Is Comment -> return empty
     * Is Escaped -> return string
     * Is Command -> recurse into parseString and return command object
     * Is Key -> return key object
     */
    if (strTrimmed.startsWith(control.data.comment)) { //Comment
        result = [ids.comment, str.replace(control.data.comment, "")];
        resultType = "comment";
    } else if (strTrimmed.startsWith(control.data.escape)) { //Escaped
        const escapedText = control.tree.open + str.replace(control.data.escape, "") + control.tree.close;

        result = [ids.string, escapedText];
        resultType = "escaped";
    } else if (strTrimmed.endsWith(control.data.delimiter)) { //Command
        const parsedCommand = _this.parseStructData(str);

        result = [ids.command, parsedCommand.name, parsedCommand.args];
        resultType = "command";
    } else { //Key
        const parsedKey = _this.parseString(str)[0];

        result = [ids.key, parsedKey];
        resultType = "key";
    }

    _this.log(["struct", resultType], result);

    return result;
};
