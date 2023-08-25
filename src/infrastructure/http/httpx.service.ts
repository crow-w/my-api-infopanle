import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { HttpHandler } from 'src/application/gateways/rpc-handler';

import type { AxiosResponse, AxiosRequestConfig } from 'axios';

@Injectable()
export class HttpXService implements HttpHandler {
  constructor(private readonly _httpService: HttpService) {}

  async get<T, Y>(
    url: string,
    token: string,
    params: T = null,
  ): Promise<AxiosResponse<Y>> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: undefined,
    };

    if (params != null) {
      config['params'] = params;
    }

    try {
      return await this._httpService.get<Y>(url, config).toPromise();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return Promise.reject(err);
      }
      return Promise.reject(new Error('不明エラー'));
    }
  }

  async post<T, Y>(
    url: string,
    token: string,
    body: T,
  ): Promise<AxiosResponse<Y>> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      return await this._httpService.post<Y>(url, body, config).toPromise();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err);
        return Promise.reject(err);
      }
      return Promise.reject(new Error('不明エラー'));
    }
  }

  async put<T, Y = any>(
    url: string,
    token: string,
    body: T,
  ): Promise<AxiosResponse<Y>> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      return await this._httpService.put<Y>(url, body, config).toPromise();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TODO カスタムエラーを作成して返却
        return Promise.reject(new Error('axios error'));
      }
      return Promise.reject(new Error('不明エラー'));
    }
  }

  async patch<T, Y = any>(
    url: string,
    token: string,
    body: T,
  ): Promise<AxiosResponse<Y>> {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      return await this._httpService.patch<Y>(url, body, config).toPromise();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TODO カスタムエラーを作成して返却
        return Promise.reject(new Error('axios error'));
      }
      return Promise.reject(new Error('不明エラー'));
    }
  }

  async delete<T, Y = any>(
    url: string,
    token: string,
    params: T = null,
  ): Promise<AxiosResponse<Y>> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: undefined,
    };

    if (params != null) {
      config['params'] = params;
    }
    try {
      return await this._httpService.delete<Y>(url, config).toPromise();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // TODO カスタムエラーを作成して返却
        return Promise.reject(new Error('axios error'));
      }
      return Promise.reject(new Error('不明エラー'));
    }
  }
}
