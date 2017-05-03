"use strict";

/**
 * Parses str into command data array
 * @param {string} str
 * @returns {Array}
 */
module.exports = function (str) {
    const _this = this;
    const control = _this.lang.control;
    const ids = _this.lang.ids;
    let result;
    let resultType = "mixed";

    const arr = str.split("");
    const data = [ids.string];
    let indexLast = 0;
    let index = 0;
    let stack = 0;

    /**
     * Flow:
     * Is "{" -> increase stack
     * Is "{" -> decrease stack
     * Is ":" and stack===0 -> push to result
     */
    while (index < arr.length) {
        const letter = arr[index];

        if (letter === control.tree.open) {
            stack++;
        }
        if (letter === control.tree.close) {
            stack--;
        }
        /**
         * Conditions:
         * 1) if letter is delimiter and stack is 0
         * 2) if on first index and letter is data
         */
        if ((index === 0 && letter === control.content.data) || (stack === 0 && letter === control.content.delimiter)) {
            const currentString = str.substr(indexLast, index - indexLast);

            if (currentString.includes(control.tree.open)) { //Commands
                const currentStruct = _this.parseString(currentString);

                data.push(currentStruct);
            } else { //Text
                data.push(currentString);
            }

            indexLast = index + 1;
        }

        index++;
    }

    result = data.slice(1);

    _this.log(["data", resultType], result);

    return result;
};
