"use strict";

//The spec ONLY allows digits, no
const regexInt = /^[0-9]+$/;

module.exports = function (str) {
    if (regexInt.test(str)) {
        return Number(str);
    } else {
        //return new Error(`'${str}' is not a number`);
        return false;
    }
};
