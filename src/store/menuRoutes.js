export default {
    // 命名规范
    namespaced: true,

    state: {
        // 存储菜单路由信息
        newsRouters: [],   
    },
    mutations: {
        setNewsRouters(state, payload) {
            state.newsRouters = payload;
        }
    },
    actions: {
        changeNewsRouters(ctx, payload) {
            ctx.commit('setNewsRouters', payload);
        }
    },
}