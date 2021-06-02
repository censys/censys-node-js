import pack from "../package.json";

export const TIMEOUT_SECONDS = 30;
export const MAX_RETRIES = 10;
export const USER_AGENT = `${pack.name}/${pack.version}`;
export const SEARCH_DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSSSS";
