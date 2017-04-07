"use strict";

module.exports = function (args, ctx) {
    const map = new Map();

    //context
    map.set("tag", ctx.tag);
    map.set("meid", ctx.meid);
    map.set("caller", ctx.caller);
    map.set("channel", ctx.channel);
    map.set("channelid", ctx.channelid);
    map.set("server", ctx.server);
    map.set("serverid", ctx.serverid);
    map.set("time", new Date(ctx.time).toUTCString());
    map.set("uses", ctx.uses);
    map.set("newrep", ctx.newrep);

    //args

    return map;
};
