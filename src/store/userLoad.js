import userAxios from "@/api/user.js";
import {setCook,getCook,removeCook} from "@/utils/getCookie";
export default {
    // 命名规范
    namespaced: true,

    state: {
        // 登录状态 用户信息
        user: getCook()
    },
    // 计算属性
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        loginOut(state) {
            state.user = {
                appkey : '',
                email : '',
                role : '',
                username : ''
            };
        }
    },
    actions: {
        // 用户登录
        async userLogin(ctx, payload) {
            const resp = await userAxios.login(payload);
            setCook(resp.data);
            ctx.commit('setUser',resp.data);
            return resp;
        },
        userLoginOut(ctx) {
            ctx.commit('loginOut');
            removeCook();
        }
    },
}