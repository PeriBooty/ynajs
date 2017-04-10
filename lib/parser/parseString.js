"use strict";

/**
 * Parses string into strings/commands array
 * @param {String} str
 * @returns {Array}
 */
module.exports = function (str) {
    const _this = this;
    const treeControl = _this.controlChars;

    if (!str.includes(treeControl.open)) { //Exit early if no brace is opened
        return [str];
    } else {
        let result = [];
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

                    result.push(partString);
                    indexLast = indexNext;
                }
            }
            if (letter === treeControl.close) { //On end-tag
                stack--;

                if (stack === 0) {
                    const partString = str.substr(indexLast + 1, indexNext - indexLast - 1);
                    const partCommand = _this.parseCommand(partString);

                    result.push(partCommand);
                    indexLast = indexNext + 1;
                }
            }

            indexNext++;
        });

        result.push(str.substr(indexLast, indexNext));
        result = result.filter(item => item !== ""); //remove empty strings and comments

        if (_this.debug) {
            console.log("PARSE.string", result);
        }

        return result;
    }
};
