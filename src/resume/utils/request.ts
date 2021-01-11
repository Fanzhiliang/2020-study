import axios from 'axios'

const service = axios.create({
  baseURL: process.env.RESUME_BASE_API,
  timeout: 5000,
  // withCredentials: true // send cookies when cross-domain requests
})

service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'token'
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      return Promise.reject(new Error(res.msg || '接口错误'))
    } else {
      return response.data
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
