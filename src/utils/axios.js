import axios from 'axios';
import store from 'store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
const service = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 10 * 1000
});
// 添加一个请求拦截器
service.interceptors.request.use(config => {
    NProgress.start();
    // Do something before request is sent
    if (store.getters.token) {
        config.headers['X-Token'] = store.getters.token;
    }
    return config;
}, error =>
    // Do something with request error
    Promise.reject(error)
);

// 添加一个响应拦截器
service.interceptors.response.use(response => {
    NProgress.done();
    // Do something with response data
    return response;
}
    , error => {
    NProgress.done();
    // Do something with response error
    console.log();
    return Promise.reject(error);
}
);

export default service;
