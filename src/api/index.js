import request from '../services/http'

const api = {
    searchFlights: (params) => request.post('/flights/search', params),
    regist: (params) => request.post('/auth/register', params),
    login: (params) => request.post('/auth/login', params),
}

export default api;