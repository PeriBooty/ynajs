import pydateformat from "pydateformat";

const toTime = (time: any, format: string = "%H:%M"): string =>
    pydateformat(time, format);

export { toTime };
