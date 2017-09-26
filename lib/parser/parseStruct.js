"use strict";

/**
 * parses struct-string into struct-array
 *
 * @param {string} str
 * @returns {Array<any>}
 */
module.exports = function (str) {
    const control = this.lang.control;
    const ids = this.lang.ids;
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
    if (strTrimmed.startsWith(control.data.comment)) {
        /**
         * Comment
         */
        result = "";
        resultType = "comment";
    } else if (strTrimmed.startsWith(control.data.escape)) {
        /**
         * Escaped
         */
        const escapedText = control.tree.open + str.replace(control.data.escape, "") + control.tree.close;

        result = [ids.string, escapedText];
        resultType = "escaped";
    } else if (strTrimmed.endsWith(control.data.delimiter)) {
        /**
         * Command
         */
        const parsedCommand = this.parseStructData(str);

        result = [ids.command, parsedCommand.name, parsedCommand.args];
        resultType = "command";
    } else {
        /**
         * Key
         */
        const parsedKey = this.parseString(str);

        result = [ids.key, parsedKey];
        resultType = "key";
    }

    this.log(["struct", resultType], result);

    return result;
};
