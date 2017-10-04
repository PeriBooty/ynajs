"use strict";

/**
 * parses block-string into block-array
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
     * Is comment -> return empty
     * Is escaped -> return string
     * Is command -> recurse into parseString and return command object
     * Is key -> return key object
     */
    if (strTrimmed.startsWith(control.data.comment)) {
        /**
         * Comment
         */
        const commentText = control.tree.open + str.replace(control.data.comment, "") + control.tree.close;

        result = [ids.comment, commentText];
        resultType = "comment";
    } else if (strTrimmed.startsWith(control.data.escape)) {
        /**
         * Escaped
         */
        const escapedText = control.tree.open + str.replace(control.data.escape, "") + control.tree.close;

        result = escapedText;
        resultType = "escaped";
    } else if (strTrimmed.endsWith(control.data.delimiter)) {
        /**
         * Command
         */
        const parsedCommand = this.parseBlockData(str);

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

    this.log(["block", resultType], result);

    return result;
};
