"use strict";

const compact = require("lodash/compact");
const stringifyError = require("../util/stringifyError");

/**
 * Parses string into strings/commands array
 * @param {String} str
 * @returns {Array}
 */
module.exports = function (str) {
    const _this = this;
    const treeControl = _this.controlChars;
    let result;
    let resultType;

    if (!str.includes(treeControl.open)) {//Skip early if no brace is opened
        result = [str];
        resultType = "single";
    } else {
        const data = [];
        let indexLast = 0;
        let indexNext = 0;
        let stack = 0;

        /**
         * Flow:
         * Is "{"? -> increase stack and push part if stack === 1
         * Is "{"? -> decrease stack and push part if stack === 0
         * Else return string
         */
        str.split("").forEach(letter => {
            if (letter === treeControl.open) {
                stack++;

                if (stack === 1) { //On start-tag
                    const partString = str.substr(indexLast, indexNext - indexLast);

                    data.push(partString);
                    indexLast = indexNext;
                }
            }
            if (letter === treeControl.close) { //On end-tag
                stack--;

                if (stack === 0) {
                    const partString = str.substr(indexLast + 1, indexNext - indexLast - 1);
                    const partCommand = _this.parseCommand(partString);

                    data.push(partCommand);
                    indexLast = indexNext + 1;
                }
            }

            indexNext++;
        });

        data.push(str.substr(indexLast, indexNext));

        if (stack === 0) {
            result = compact(data); //remove empty strings
        } else {
            result = stringifyError("parser", new Error("mismatched brackets"));
        }
    }

    _this.log(["string", resultType], result);

    return result;
};
