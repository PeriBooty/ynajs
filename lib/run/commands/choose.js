"use strict";

module.exports = function (data, exec, keys, commands) {
    const max = data[0] || 100;

    return Math.floor(Math.random() * (max + 1));
};
