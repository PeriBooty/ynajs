"use strict";

const isKey = require("../../../types/isKey");
const resolveMember = require("./lib/resolveMember");
const convertMember = require("./lib/convertMember");

module.exports = function (dataRaw) {
    const discord = this.options.plugins.discord;

    if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length === 1) {
        return new Error("no query");
    } else {
        const key = this.execItem(dataRaw[0]);

        if (!isKey(key)) {
            return new Error("invalid key");
        } else {
            const memberResolvable = this.execItem(dataRaw[1]);
            const member = resolveMember(memberResolvable, discord.msg.guild);

            if (member !== null) {
                this.keys.set(key, convertMember(member));

                return "";
            } else {
                return new Error("not found");
            }
        }
    }
};
