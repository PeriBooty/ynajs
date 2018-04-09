import { utc } from "moment";

const toDatetime = time => utc(time).format("YYYY-MM-DD HH:mm:ss:SSSSSS");

export { toDatetime };
