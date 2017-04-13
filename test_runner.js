"use strict";

const fs = require("fs");
//const util = require("util");
const Yna = require("./index");

//Tag setup
const tag_content = fs.readFileSync("yna/simple.yna", {
    encoding: "utf8"
});

//Data dump
const exampleData = {
    user: {
        name: "NobodyRocks",
        id: "128985967875850240",
        discriminator: "5051",
        avatar: "35a8b84d61abf268e326de42e90f33a7",
        bot: false,
        avatar_url: null,
        default_avatar: null,
        default_avatar_url: null,
        mention: "<@!128985967875850240>",
        created_at: "2016-04-07 15:23:01.000000",
        display_name: "Nobeon"
    },
    channel: {
        name: "kanto",
        server: null,
        id: "292977678745862145",
        topic: "**Welcome to Kanto!**\n\nThis is the general channel!",
        is_private: false,
        position: 3,
        type: "text",
        bitrate: "none",
        is_default: false,
        user_limit: "none",
        mention: "<@#292977678745862145>",
        created_at: "2017-04-07 15:23:01.000000"
    },
    server: {
        name: "Eevee World",
        me: null,
        region: "us-east",
        afk_timeout: 30,
        icon: "1945604a31246aa3edeb312365ce78e6",
        id: "292971950651867137",
        unavailable: false,
        large: false,
        mfa_level: 0,
        splash: null,
        icon_url: null,
        splash_url: null,
        member_count: 32,
        created_at: "2017-04-07 15:23:01.000000"
    }
};

const instance = new Yna(tag_content, {
    name: "simple_tag",
    creator: exampleData.user
},{
    debug:true
});
const result = instance.run(["foo", "bar"], [exampleData.user], { //Tag execution
    caller: exampleData.user,
    channel: exampleData.channel,
    server: exampleData.server,
    time: Date.now(),
    uses: 23,
    newrep: false
});


console.log(result);
