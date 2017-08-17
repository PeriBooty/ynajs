"use strict";

//const isKey = require("ynajs/lib/types/isKey");
//const resolveUserId = require("../resolveUserId");
//const convertMember = require("../convertMember");

module.exports = function (dataRaw) {
    const discord = this.options.plugins.discord;

    return "<NYI>";
    /*if (dataRaw.length === 0) {
        return new Error("no args");
    } else if (dataRaw.length === 1) {
        return new Error("no query");
    } else {
        const key = this.execItem(dataRaw[0]);

        if (!isKey(key)) {
            return new Error("invalid key");
        } else {
            const memberResolvable = this.execItem(dataRaw[1]);
            const member = resolveUserId(memberResolvable, msg.guild);

            if (member !== null) {
                this.keys.set(key, convertMember(member));

                return "";
            } else {
                return new Error("not found");
            }
        }
    }*/
};
