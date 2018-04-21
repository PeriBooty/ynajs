import { Moment } from "moment";

const toDatetime = (time: Moment): string =>
    time.format("YYYY-MM-DD HH:mm:ss:SSSSSS");

export { toDatetime };
