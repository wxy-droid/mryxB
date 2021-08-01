// 用户信息接口
import instance from "./axios";

export default {
    // 用户登录
    login(params) {
        return instance.post('/passport/login',params);
    },
    // 用户注册
    logon(params) {
        return instance.post('/passport/logon',params);
    },
    // 发送验证码
    getCode(params) {
        return instance.post('/passport/getCode',params);
    },
    // 忘记密码
    getPass(params) {
        return instance.post('/passport/findBack',params);
    },
    // 修改用户信息
    getChangeUserInfo(params) {
        return instance.put('/passport/changeUserInfo',params);
    }
}