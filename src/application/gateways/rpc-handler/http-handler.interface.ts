import type { AxiosResponse } from 'axios';

export const HTTP_HANDLER = 'http_handler';

export interface HttpHandler {
  get<T, Y>(url: string, token: string, params: T): Promise<AxiosResponse<Y>>;
  post<T, Y>(url: string, token: string, body: T): Promise<AxiosResponse<Y>>;
  put<T, Y = any>(
    url: string,
    token: string,
    body: T,
  ): Promise<AxiosResponse<Y>>;
  patch<T, Y = any>(
    url: string,
    token: string,
    body: T,
  ): Promise<AxiosResponse<Y>>;
  delete<T, Y = any>(
    url: string,
    token: string,
    params: T,
  ): Promise<AxiosResponse<Y>>;
}
