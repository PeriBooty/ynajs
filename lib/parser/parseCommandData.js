"use strict";

const stringifyError = require("../util/stringifyError");

module.exports = function (str) {
    const _this = this;
    const treeControl = _this.controlChars;
    const delimiterList = [treeControl.delimiter, treeControl.list];
    let result = [];
    let resultType = "null";

    if (!str.endsWith(treeControl.delimiter)) { //Exit early if invalid
        result = [stringifyError("parser", new Error("missing semicolons"))];
        resultType = "error";
    } else if (!str.includes(treeControl.open)) { //Exit early if no brace is opened
        result = str.substr(0, str.length - 1).split(treeControl.delimiter); //cut last letter and split
        resultType = "simple";
    } else {
        const arr = str.split("");
        const data = [];
        let indexLast = 0;
        let index = 0;
        let stack = 0;

        /**
         * Flow:
         * Is "{"? -> increase stack
         * Is "{"? -> decrease stack
         * Is ":" and stack===0? -> push to result
         */
        while (index < arr.length) {
            const letter = arr[index];

            if (letter === treeControl.open) {
                stack++;
            }
            if (letter === treeControl.close) {
                stack--;
            }
            if (delimiterList.includes(letter) && stack === 0) {
                const partString = str.substr(indexLast, index - indexLast);

                if (partString.includes(treeControl.open)) { //Commands
                    const partStringArr = _this.parseString(partString);

                    data.push(...partStringArr);
                } else { //Text
                    data.push(partString);
                }

                indexLast = index + 1;
            }

            index++;
        }

        result = data;
        resultType = "mixed";
    }

    _this.log(["data", resultType], result);

    return result;
};
