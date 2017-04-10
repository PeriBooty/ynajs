"use strict";

module.exports = (arr, type) => arr.every(item => typeof item === type);
