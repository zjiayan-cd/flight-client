import axios from 'axios'
import i18n from 'i18next'


let tokenExpiredHandled = false
/**
 * process error method
 */
const errorHandle = (status, info, err) => {
    console.log("status:", status)
    switch (status) {
        case 400:
            console.log("The current request cannot be understood by the server. The client should not submit the request repeatedly unless it is modified.")
            break;
        case 401:
            console.log("server authentication fails.", err)
            const errorType = err.response?.data?.error
            if (errorType === 'TOKEN_EXPIRED' && !tokenExpiredHandled) {
              tokenExpiredHandled = true
              window.dispatchEvent(new Event('token-expired'))

              setTimeout(() => {
                tokenExpiredHandled = false
              }, 1000)
            }
            break;
        case 403:
            console.log("The server has understood the request but refuses to execute it.")
            break;
        case 404:
            console.log("Please check the network request address.")
            break;
        case 500:
            console.log("The server encountered an unexpected situation that caused it to be unable to complete processing of the request. Generally, this problem occurs when the server's code is faulty.")
            break;
        case 502:
            console.log("An invalid response was received from the upstream server.")
            break;
        default:
            console.log(info)
            break;
    }
}

/**
 * create axios instance
 */

const instance = axios.create({
    baseURL: '/api', // 所有请求都以 /api 开头，开发环境走 Vite 代理
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
      },
})

/**
 * request interceptor
 */
instance.interceptors.request.use(    
    config => {
        let access_token = localStorage.getItem('token')
        if (access_token != null) {
            config.headers["authorization"] = `Bearer ${access_token}`
        }

        config.headers['Accept-Language'] = i18n.language || 'en'

        return config
    },
    error => Promise.reject(error)
)

/**
 * response interceptor
 * Error 对象大致结构：
 * {
        config: {...},          // 请求的配置信息，比如 url、method、headers 等
        request: {...},         // 原始 XMLHttpRequest 对象
        response: {             // 服务器返回的响应（如果有的话）
            status: 401,
            data: {...},          // 响应体
            headers: {...},
            config: {...},
            ...
        },
        message: "Request failed with status code 401",
        name: "AxiosError",
        ...
    }
 */
instance.interceptors.response.use(
    response => {
        if (response.status >= 200 && response.status < 300) {
            return response
          } else {
            return Promise.reject(response)
          }
    }, //请求成功的回调
    error => { //请求失败的回调
        const { response } = error //从 Axios 抛出的错误对象中提取 response 字段
        if(response){
            errorHandle(response.status, response.data, error)
        }else{
            console.error('Unknown axios error:', error)
        }
        
        return Promise.reject(error)
    }
)

export default instance

