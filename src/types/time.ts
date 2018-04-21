import { Moment } from "moment";
import pydateformat from "pydateformat";

const toTime = (time: Moment, format: string = "%H:%M"): string =>
    pydateformat(time, format);

export { toTime };
