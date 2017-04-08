"use strict";

const moment = require("moment");

const convertDate = dateString => moment(dateString).format("YYYY-MM-DD HH:mm:ss:SSSSSS");
const getLengthString = arr => String(arr.length);

module.exports = function (tag, args, mentions, ctx) {
    const map = new Map();

    //context
    map.set("tag", tag.name);
    map.set("meid", ctx.meid);
    map.set("caller", ctx.caller);
    map.set("channel", ctx.channel);
    map.set("channelid", ctx.channel.id);
    map.set("server", ctx.server);
    map.set("serverid", ctx.server.id);
    map.set("time", convertDate(ctx.time));
    map.set("uses", String(ctx.uses));
    map.set("newrep", String(ctx.newrep));

    //Creator
    map.set("me", tag.creator);
    map.set("meid", tag.creator.id);

    //Args
    map.set("args", args.join(" "));
    map.set("arglen", getLengthString(args));
    args.forEach((arg, index) => {
        map.set("arg" + index, arg);
    });

    //Mentions
    map.set("mentionlen", getLengthString(mentions));
    mentions.forEach((mention, index) => {
        map.set("mention" + index, mention);
    });

    return map;
};
