export default {
    // 命名规范
    namespaced: true,

    state: {
        // 切换菜单 false为开 true为闭
        collapsed: false
    },
    mutations: {
        setCollapsed(state) {
            state.collapsed = !state.collapsed;
        }
    },
    actions: {
        changeCollapsed({ commit }) {
            commit('setCollapsed');
        }
    },
}