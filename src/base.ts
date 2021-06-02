import originalFetch from "isomorphic-unfetch";
import fetchBuilder from "fetch-retry";
import { MAX_RETRIES, TIMEOUT_SECONDS, USER_AGENT } from "./consts";
import { isEmpty } from "./utils";
import { BaseOptions, Dict, Response } from "./types";

const fetch = fetchBuilder(originalFetch, {
  retries: MAX_RETRIES,
  retryDelay: TIMEOUT_SECONDS * 1000,
});

export default class BaseApi {
  baseUrl: string;
  headers: Dict;

  constructor({
    baseUrl,
    userAgent = USER_AGENT,
    headers = {},
  }: BaseOptions) {
    this.baseUrl = baseUrl;
    this.headers = {
      Accept: "application/json, */8",
      "Content-type": "application/json",
      "User-Agent": userAgent,
      ...headers,
    };
  }

  request(
    endpoint: string,
    params: Dict = {},
    options: RequestInit = {}
  ): Promise<Response> {
    let url = this.baseUrl + endpoint;
    if (!isEmpty(params)) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }
    const config: RequestInit = {
      ...options,
      headers: this.headers,
    };
    return fetch(url, config).then((_res) => {
      return _res
        .json()
        .then((json) => {
          return _res.ok ? json : Promise.reject(json);
        })
        .catch((err) => {
          if (err.name === "FetchError") {
            return Promise.reject(_res.statusText);
          }
          return Promise.reject(err);
        });
    });
  }
}
