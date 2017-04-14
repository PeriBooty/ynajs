"use strict";

module.exports = function (str) {
    const _this = this;
    const treeControl = _this.controlChars;
    let result = "";
    let resultType = "null";

    if (!str.includes(treeControl.delimiter)) { //Exit early if no data is opened
        result = [];
        resultType = "empty";
    } else if (!str.includes(treeControl.open)) { //Exit early if no brace is opened
        result = str.split(treeControl.delimiter);
        resultType = "simple";
    } else {
        const data = [];
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

                    data.push(...partStringArr);
                } else { //Text
                    data.push(partString);
                }

                indexLast = indexNext + 1;
            }

            indexNext++;
        });

        result = data;
        resultType = "mixed";
    }

    _this.log(["data", resultType], result);

    return result;
};
