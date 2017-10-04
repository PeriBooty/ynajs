"use strict";

const stringifyError = require("../util/stringifyError");

/**
 * Parses block data string into strings/block array
 *
 * @param {string} str
 * @returns {Array<any>}
 */
module.exports = function (str) {
    const control = this.lang.control;
    const strData = [];
    const result = {
        name: [],
        args: []
    };
    let resultType;
    let strStack = 0;
    let strIndex = 0;
    let strIndexLast = 0;
    let encounteredDataStart = false;

    /**
     * Flow:
     * Is "{" -> increase strStack and push part if strStack === 1
     * Is "}" -> decrease strStack and push part if strStack === 0
     * Else return string
     */
    while (strIndex < str.length) {
        const letter = str[strIndex];

        /**
         * Tree opening/closing
         */
        if (letter === control.tree.open || letter === control.tree.close) {
            /**
             *  Increase/Decrease strStack based on open/close control
             */
            strStack += letter === control.tree.open ? 1 : -1;
        }

        if (strStack === 0 && (letter === control.data.delimiter || (letter === control.data.start && !encounteredDataStart))) {
            const currentString = str.substr(strIndexLast, strIndex - strIndexLast);
            const currentBlock = this.parseString(currentString.substr(0, currentString.length), true);

            strData.push(currentBlock);
            strIndexLast = strIndex + 1;

            //Only use the first data-start, ignore after
            if (letter === control.data.start) {
                encounteredDataStart = true;
            }
        }

        strIndex++;
    }

    /**
     * If strStack is not zero, there are unmatched brackets
     */
    if (strStack !== 0) {
        result.name = strData[0];
        result.args = stringifyError("parser", new Error("mismatched brackets"));
        resultType = "error";
    } else {
        result.name = strData[0];
        result.args = strData.slice(1);
        resultType = "mixed";
    }

    this.log(["strData", resultType], result);

    return result;
};
