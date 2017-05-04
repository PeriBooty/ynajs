"use strict";

const stringifyError = require("../util/stringifyError");

/**
 * Parses struct data string into strings/commands array
 * @param {String} str
 * @returns {Array}
 */
module.exports = function (str) {
    const _this = this;
    const control = _this.lang.control;
    const ids = _this.lang.ids;
    const arr = str.split("");
    const result = {
        name: [],
        args: []
    };
    let resultType;

    const data = [];
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
            stack += letter === control.tree.open ? 1 : -1; //bump or dump the stack based on tree struct
        }

        if (stack === 0 && (letter === control.data.start || letter === control.data.delimiter)) {
            const currentString = str.substr(indexLast, index - indexLast);
            const currentStruct = _this.parseString(currentString.substr(0, currentString.length), true);

            data.push(currentStruct);
            indexLast = index + 1;
        }

        index++;
    }

    /**
     * If the stack ends at zero all brackets are balanced
     */
    if (stack === 0) {
        result.name = data[0];
        result.args = data.slice(1);
        resultType = "mixed";
    } else {
        result.name = data[0];
        result.args = stringifyError("parser", new Error("mismatched brackets"));
        resultType = "error";
    }

    _this.log(["data", resultType], result);

    return result;
};
