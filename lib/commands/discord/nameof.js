"use strict";

const resolveUserId = require("./lib/resolveUserId");
const convertMember = require("./lib/convertMember");

module.exports = function (dataRaw) {
    const discord = this.options.plugins.discord;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else {
        const memberResolvable = this.execItem(dataRaw[0]);
        const member = convertMember(resolveUserId(memberResolvable, discord.msg.guild));

        if (member !== null) {
            return member.__default;
        } else {
            return new Error("not found");
        }
    }
};
