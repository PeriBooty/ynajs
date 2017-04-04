"use strict";

const treeControl = require("./constants");

/**
 * parses command-string into command object
 * @param {String} str
 */
module.exports = function (str) {
    const result = {
        type: null,
        data: []
    };
    const strStripped = str.substring(1, str.length - 1);
    const contentIndex = strStripped.indexOf(treeControl.content);

    if (contentIndex !== -1) {
        result.type = strStripped.substring(0, contentIndex);



    } else {
        result.type = strStripped;
    }

    return result;
};
