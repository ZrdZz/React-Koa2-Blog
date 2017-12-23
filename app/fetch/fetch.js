import axios from 'axios';

let config = {
    baseURL: '/',
    transformResponse: [
        function (data) {
            return data
        }
    ],
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    timeout: 10000,
    responseType: 'json'
};

axios.interceptors.response.use(function(res){
    //相应拦截器
    return res.data;
});


export function get(url) {
    return axios.get(url, config)
}

export function post(url, data) {
    return axios.post(url, data, config)
}