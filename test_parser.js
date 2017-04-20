"use strict";

const fs = require("fs");
const util = require("util");
const Yna = require("./index");
const content=[{"type":"command","name":"oneline","data":[["\n\t",{"type":"command","name":"set","data":["moji_hand",[{"type":"command","name":"choose","data":["/","\\\\","\\_/","\\\\\\_","\\_","7","<","=",">","\\~","?","�","�","n","+","+","?","?","?","?"]}]]},"\n\t",{"type":"command","name":"set","data":["moji_eye",[{"type":"command","name":"choose","data":["n","u","o","v","O","U","V","#","$","'","\\*","+","-",".","0","<","=",">","@","^","~","�","�","�","�","�","�","�","�","?","O","o","O","o","^","?","�","�","?","?","?","?","?","?","?","?","?","?","?","?","?","?","�","�","�","/�/","?","?","?","?","?","?","?","?","?","�","?","o","?","/>/","/</","?","?","?","?"]}]]},"\n\t",{"type":"command","name":"set","data":["moji_mouth",[{"type":"command","name":"choose","data":["#","+",".","6","<","=","-",">","O","U","V","W","\\_","o","u","v","w","~","�","?","?","O","e","?","?","?","?","?","�","�","�","�","?","?","?","?","?","?","?","O","?"]}]]},"\n\n\t",{"type":"key","name":"moji_hand"},"(",{"type":"key","name":"moji_eye"},{"type":"key","name":"moji_mouth"},{"type":"key","name":"moji_eye"},")",{"type":"key","name":"moji_hand"},"\n    ","\n"]]},"\n"];
//Tag setup
const tag_content = fs.readFileSync("yna/simple.yna", {
    encoding: "utf8"
});
const tag = new Yna(content, {},
    {
        parser: {
            debug: true
        }
    }
);

console.log(JSON.stringify(tag.tree));
