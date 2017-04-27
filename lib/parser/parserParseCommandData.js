"use strict";

/**
 * Parses str into command data array
 * @param {string} str
 * @returns {Array}
 */
module.exports = function (str) {
    const _this = this;
    const controlChars = _this.controlChars;
    let result;
    let resultType;


    /*if (!str.includes(controlChars.open)) { //Exit early if no brace is opened
        result = str.split(controlChars.delimiter); //cut last letter and split
        resultType = "simple";
    } else {*/
    const arr = str.split("");
    const data = [];
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

        if (letter === controlChars.open) {
            stack++;
        }
        if (letter === controlChars.close) {
            stack--;
        }
        /**
         * Conditions:
         * 1) if letter is delimiter and stack is 0
         * 2) if on first index and letter is data
         */
        if ((index === 0 && letter === controlChars.data) || (stack === 0 && letter === controlChars.delimiter)) {
            const partstring = str.substr(indexLast, index - indexLast);

            if (partstring.includes(controlChars.open)) { //Commands
                const partstringArr = _this.parseString(partstring);

                data.push(partstringArr);
            } else { //Text
                data.push(partstring);
            }

            indexLast = index + 1;
        }

        index++;
    }

    data.shift(); //remove first element

    result = data;
    resultType = "mixed";
    //}

    _this.log(["data", resultType], result);

    return result;
};
