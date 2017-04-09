"use strict";

const fs = require("fs");
const util = require("util");
const Na = require("./index");
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
    }
}
	
//Tag setup
const tag_content = fs.readFileSync("yna/simple.yna", {
    encoding: "utf8"
});
const instance = new Na("simple", tag_content, exampleData);

console.log(JSON.stringify(instance.tree," "," "));
