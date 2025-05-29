import axios from 'axios'

/**
 * process error method
 */
const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log("The current request cannot be understood by the server. The client should not submit the request repeatedly unless it is modified.")
            break;
        case 401:
            console.log("server authentication fails.")
            break;
        case 403:
            console.log("The server has understood the request but refuses to execute it.");
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
    baseURL: '/api', // 这样所有请求都以 /api 开头，走 Vite 代理
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
        console.log("access_token",access_token)
        if (access_token != null) {
            // config.headers["authorization"] = access_token;
            config.headers['Authorization'] = `Bearer ${access_token}`
        }
        return config
    },
    error => Promise.reject(error)
)

/**
 * response interceptor
 */
instance.interceptors.response.use(
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error => {
        const { response } = error;
        errorHandle(response.status, response.info);
        return Promise.reject(error);
    }
)

export default instance

