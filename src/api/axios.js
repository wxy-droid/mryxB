import axios from "axios";
import store from "../store";

// 创建axios实例
const instance = axios.create({
    baseURL: 'https://mallapi.duyiedu.com/',
});

// 拦截器(拦截你每次请求和响应)
// 请求拦截器
instance.interceptors.request.use((config) => {
    // 如果url里没有passport 说明是需要appkey的接口
    if (config.url.includes('passport')) {
        return config
    } else {
        return {
            ...config,
            params: {
                ...config.params,
                appkey: store.state.userLoad.user.appkey
            }
        }
    }
}, err => { return Promise.reject(err) }
);
// 响应拦截器
instance.interceptors.response.use((resp) => {
    if (resp.data.status === 'fail') {
        // 邮箱或密码输入错误
        return Promise.reject(resp.data.msg);
    } else {
        return resp.data;
    }
}, err => { return Promise.reject(err) });

export default instance;