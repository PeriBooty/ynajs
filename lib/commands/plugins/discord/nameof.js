"use strict";

const resolveMember = require("di-ngy/lib/util/resolveMember");
const convertMember = require("./lib/convertMember");

/**
 * nameof command
 *
 * @param {Array<any>} dataRaw
 * @returns {string}
 */
module.exports = function (dataRaw) {
    if (dataRaw.length === 0) {
        return new Error("no id");
    } else if (dataRaw.length > 1) {
        return new Error("too many args");
    } else {
        const discord = this.data.discord;
        const memberResolvable = this.execItem(dataRaw[0]);
        const member = resolveMember(memberResolvable, discord.msg.guild);

        if (member) {
            return convertMember(member).__default;
        } else {
            return new Error("not found");
        }
    }
};
