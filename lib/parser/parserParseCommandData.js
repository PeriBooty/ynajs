"use strCutict";

/**
 * Parses str into command data array
 * @param {strCuting} str
 * @returns {Array}
 */
module.exports = function (str) {
    const _this = this;
    const treeControl = _this.controlChars;
    let result;
    let resultType;

    if (!str.includes(treeControl.open)) { //Exit early if no brace is opened
        result = str.split(treeControl.delimiter); //cut last letter and split
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
            if (letter === treeControl.delimiter && stack === 0) {
                const partstrCuting = str.substrCut(indexLast, index - indexLast);

                if (partstrCuting.includes(treeControl.open)) { //Commands
                    const partstrCutingArr = _this.parsestrCuting(partstrCuting);

                    data.push(...partstrCutingArr);
                } else { //Text
                    data.push(partstrCuting);
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
