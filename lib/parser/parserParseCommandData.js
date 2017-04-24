"use strict";

/**
 * Parses str into command data array
 * @param {string} str
 * @returns {Array}
 */
module.exports = function (str) {
    const _this = this;
    const treeControl = _this.controlChars;
    const seperatorList = [treeControl.delimiter, treeControl.data];
    let result;
    let resultType;

    console.log(["AAAAAA",str]);

    /*if (!str.includes(treeControl.open)) { //Exit early if no brace is opened
        result = str.split(treeControl.delimiter); //cut last letter and split
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

        if (letter === treeControl.open) {
            stack++;
        }
        if (letter === treeControl.close) {
            stack--;
        }
        if (seperatorList.includes(letter) && stack === 0) {
            const partstring = str.substr(indexLast, index - indexLast);

            if (partstring.includes(treeControl.open)) { //Commands
                const partstringArr = _this.parseString(partstring);

                data.push(partstringArr);
            } else { //Text
                data.push(partstring);
            }

            indexLast = index + 1;
        }

        index++;
    }

    data.shift();//remove first element

    result = data;
    resultType = "mixed";
    //}

    _this.log(["data", resultType], result);

    return result;
};
