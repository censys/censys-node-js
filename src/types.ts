// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dict = Record<string, any>;

export interface BaseOptions {
  baseUrl: string;
  userAgent?: string;
  headers?: Dict;
}

export interface SearchApiOptions {
  apiId?: string;
  apiSecret?: string;
  index?: string;
}

export interface AsmApiOptions {
  apiKey?: string;
}

export interface v1Response {
  results?: Dict[];
  metadata?: Dict;
}

export interface v2Response {
  result?: Dict;
}

export interface AsmResponse {
  pageNumber?: number;
  totalPages?: number;
  endOfEvents?: boolean;
  cursor?: string;
  nextCursor?: string;
  events?: Dict[];
  seeds?: Dict[];
}

export type Response = v1Response & v2Response & AsmResponse;
