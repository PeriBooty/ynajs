"use strict";

const stringifyError = require("../util/stringifyError");

/**
 * Parses string into strings/block array
 *
 * @param {string} str
 * @returns {string|Array<any>}
 */
module.exports = function (str, stripEmpty = true) {
    const control = this.lang.control;
    const strData = [];
    let strStack = 0;
    let strIndex = 0;
    let strIndexLast = 0;
    let result;
    let resultType;

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
            const currentString = str.substr(strIndexLast, strIndex - strIndexLast);

            strStack += letter === control.tree.open ? 1 : -1; //bump or dump the strStack based on tree block

            /**
             * If a block has been entered, push the previous string to the container
             */
            if (letter === control.tree.open && strStack === 1) {
                strData.push(currentString);
                strIndexLast = strIndex;
            }

            /**
             * If a block has been exited, evaluate the content and push to the container
             */
            if (letter === control.tree.close && strStack === 0) {
                const currentBlock = this.parseBlock(currentString.substr(1, currentString.length - 1));

                strData.push(currentBlock);
                strIndexLast = strIndex + 1;
            }
        }

        strIndex++;
    }

    /**
     * Push remaining string to the container
     */
    strData.push(str.substr(strIndexLast, strIndex));

    /**
     * If strStack is not zero, there are unmatched brackets
     */
    if (strStack !== 0) {
        result = stringifyError("parser", new Error("mismatched brackets"));
        resultType = "error";
    } else {
        /**
         * Remove empty entries while not in stripEmpty mode
         */
        const dataFiltered = strData.filter(item => !stripEmpty || item.length !== 0);

        /**
         * If th result is a single-item array, return the item directly
         */
        if (dataFiltered.length === 1) {
            result = dataFiltered[0];
            resultType = "single";
        } else {
            result = dataFiltered;
            resultType = "mixed";
        }
    }

    this.log(["string", resultType], result);

    return result;
};
