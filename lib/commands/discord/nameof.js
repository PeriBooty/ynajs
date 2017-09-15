"use strict";

const resolveMember = require("./lib/resolveMember");
const convertMember = require("./lib/convertMember");

module.exports = function (dataRaw) {
    const discord = this.options.plugins.discord;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length > 1) {
        return new Error("too many args");
    } else {
        const memberResolvable = this.execItem(dataRaw[0]);
        const member = resolveMember(memberResolvable, discord.msg.guild);

        if (member) {
            return convertMember(member).__default;
        } else {
            return new Error("not found");
        }
    }
};
