export default class APIError extends Error {
  url: string;
  status: number;
  info?: any;
  method?: Method


  constructor(message: string, url: string, status: number, method?: Method) {
    super(message);

    this.url = url;
    this.status = status || 500;
    this.method = method;
  }
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';