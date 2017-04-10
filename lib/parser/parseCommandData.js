"use strict";

module.exports = function (str) {
    const _this = this;
    const treeControl = _this.controlChars;

    if (!str.includes(treeControl.delimiter)) { //Exit early if no data is opened
        return [];
    } else if (!str.includes(treeControl.open)) { //Exit early if no brace is opened
        return str.split(treeControl.delimiter).filter(item => item !== "");
    } else {
        const result = [];
        let indexLast = 0;
        let indexNext = 0;
        let stack = 0;

        /**
         * Flow:
         * Is "{"? -> increase stack
         * Is "{"? -> decrease stack
         * Is ":" and stack===0? -> push to result
         */
        str.split("").forEach(letter => {
            if (letter === treeControl.open) {
                stack++;
            }
            if (letter === treeControl.close) {
                stack--;
            }
            if (letter === treeControl.delimiter && stack === 0) {
                const partString = str.substr(indexLast, indexNext - indexLast).trim();

                if (partString.includes(treeControl.open)) { //Commands
                    const partStringArr = _this.parseString(partString);

                    result.push(...partStringArr);
                } else { //Text
                    result.push(partString);
                }

                indexLast = indexNext + 1;
            }

            indexNext++;
        });

        if (_this.debug) {
            console.log("PARSE.commanddata", result);
        }

        return result;
    }
};
