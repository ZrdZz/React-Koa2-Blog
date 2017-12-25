import axios from 'axios';

let config = {
    baseURL: '/',
    transformRequest: [
        function (data) {
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }
    ],
    transformResponse: [
        function (data) {
            return data
        }
    ],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
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

// export function get(url){
//     let init = {
//         method: 'get',
//         headers: {'Content-Type': 'application/json'},
//         credentials: 'include' 
//     }

//     return fetch(url, init);
// }

// export function post(url, data){
//     let init = {
//         method: 'post',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(data),
//         credentials: 'include' 
//     }

//     return fetch(url, init);
// }