import request from '../utils/request'
import { AxiosRequestConfig } from 'axios/index'
// import { API as resumeAPI } from './resume'

// type API = resumeAPI

// interface FetchOptions extends AxiosRequestConfig {
//   url: keyof API
// }

interface FetchResponse<T = any> {
  data: T
  code: number
  msg: string
}

type FetchPromise<T = any> = Promise<FetchResponse<T>>

// const fetch = <FetchOptionsT extends FetchOptions, URL extends FetchOptionsT['url']>(options: FetchOptionsT): FetchPromise<API[URL]> => {
//   const p = request(options) as any
//   return p as FetchPromise<API[URL]>
// }

const fetch = <T = any>(options: AxiosRequestConfig): FetchPromise<T> => {
  const p = request(options) as any
  return p as FetchPromise<T>
}

export default fetch

