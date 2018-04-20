"use strict";

const { arrStep } = require("lightdash");
const Yna = require("../../../dist/yna.common");

describe("Command slice test", () => {
    it("Simple", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:0;${str};}`).run();

        expect(result).toBe(str[0]);
    });
    it("Simple negative", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:-2;${str};}`).run();

        expect(result).toBe(str[str.length - 2]);
    });
    it("Complex", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:1,,;${str};}`).run();

        expect(result).toBe(str.substr(1));
    });
    it("Complex 2", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:50,,;${str};}`).run();

        expect(result).toBe(str.substr(50));
    });
    it("Complex 3", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:-6,,;${str};}`).run();

        expect(result).toBe(str.substr(-6));
    });
    it("Complex 4", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:1,3,;${str};}`).run();

        expect(result).toBe(str.substr(1, 2));
    });
    it("Complex 5", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:5,0,;${str};}`).run();

        expect(result).toBe(str.substr(5, 0));
    });
    it("Complex 6", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:2,-5,;${str};}`).run();

        expect(result).toBe(str.substr(2, str.length - 2 - 5));
    });
    it("Complex 7", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:1,8,2;${str};}`).run();

        expect(result).toBe(arrStep(str.substr(1, 8).split(""), 2).join(""));
    });
    it("Complex 8", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:1,8,3;${str};}`).run();

        expect(result).toBe(arrStep(str.substr(1, 8).split(""), 3).join(""));
    });
    /*     it("Complex 9", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:1,8,1;${str};}`).run();

        expect(result).toBe(arrStep(str.substr(1, 8).split(""), 1).join(""));
    }); */
    it("Complex 10", () => {
        const str = "Lorem ipsum eT dolor SIT amet";
        const result = new Yna(`{slice:1,8,-2;${str};}`).run();

        expect(result).toBe(
            arrStep(str.substr(1, 8).split(""), -2)
                .reverse()
                .join("")
        );
    });

    it("No args", () => {
        const result = new Yna(`{slice;}`).run();

        expect(result).toBe("<slice:no args>");
    });
    it("Bad content", () => {
        const result = new Yna(`{slice:aaaaa;}`).run();

        expect(result).toBe("<slice:bad content>");
    });
    it("Too many nums", () => {
        const result = new Yna(`{slice:1,1,1,1;aaaaa;}`).run();

        expect(result).toBe("<slice:too many nums>");
    });
    it("Zero step", () => {
        const result = new Yna(`{slice:1,5,0;aaaaa;}`).run();

        expect(result).toBe("<slice:zero step>");
    });
    it("Non int index", () => {
        const result = new Yna(`{slice:a,b,c;aaaaa;}`).run();

        expect(result).toBe("<slice:non int index>");
    });
});
