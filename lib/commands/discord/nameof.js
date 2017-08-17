"use strict";

//const resolveUserId = require("../resolveUserId");
//const convertMember = require("../convertMember");

module.exports = function (dataRaw) {
    const discord = this.options.plugins.discord;

    return "<NYI>";
    /*if (dataRaw.length === 0) {
        return new Error("no args");
    } else {
        const memberResolvable = this.execItem(dataRaw[0]);
        const member = convertMember(resolveUserId(memberResolvable, msg.guild));

        if (member !== null) {
            return member.__default;
        } else {
            return new Error("not found");
        }
    }*/
};
