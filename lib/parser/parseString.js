"use strict";

const stringifyError = require("../util/stringifyError");

/**
 * Parses string into strings/commands array
 * @param {String} str
 * @returns {Array}
 */
module.exports = function (str, stripEmtpy = true) {
    const _this = this;
    const control = _this.lang.control;
    const ids = _this.lang.ids;
    const arr = str.split("");
    let result;
    let resultType;

    const data = [ids.string];
    let indexLast = 0;
    let index = 0;
    let stack = 0;

    /**
     * Flow:
     * Is "{" -> increase stack and push part if stack === 1
     * Is "}" -> decrease stack and push part if stack === 0
     * Else return string
     */
    while (index < arr.length) {
        const letter = arr[index];

        /**
         * Tree opening/closing
         */
        if (letter === control.tree.open || letter === control.tree.close) {
            const currentString = str.substr(indexLast, index - indexLast);

            stack += letter === control.tree.open ? 1 : -1; //bump or dump the stack based on tree struct

            /**
             * If a structure has been entered, push the previous string to the container
             */
            if (letter === control.tree.open && stack === 1) {
                data.push(currentString);
                indexLast = index;
            }

            /**
             * If a structure has been exited, evaluate the content and push to the container
             */
            if (letter === control.tree.close && stack === 0) {
                const currentStruct = _this.parseStruct(currentString.substr(1, currentString.length - 1));

                data.push(currentStruct);
                indexLast = index + 1;
            }
        }

        index++;
    }

    data.push(str.substr(indexLast, index));

    /**
     * If the stack ends at zero all brackets are balanced
     */
    if (stack === 0) {
        result = data.filter(item => !stripEmtpy || item.length !== 0); //remove empty strings
        resultType = "mixed";
    } else {
        result = stringifyError("parser", new Error("mismatched brackets"));
        resultType = "error";
    }

    _this.log(["string", resultType], result);

    return result;
};
