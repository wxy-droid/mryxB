import Home from '../views/layout/Home.vue'
import Login from "../views/layout/Login.vue";
import Logon from "../views/layout/Logon.vue";
import ForgetPass from "../views/layout/forgetPass.vue";
import ReviseUser from "../views/layout/reviseUser.vue";

export default [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/statistics',
        meta: {
            title: '首页',
            isKey: true,
            icon: 'home'
        },
        children: [{
            path: 'statistics',
            name: 'Statistics',
            component: () => import(/* webpackChunkName: "statistics" */'../views/page/statistics.vue'),
            meta: {
                title: '统计',
                icon: 'number',
                isKey: true,
            }
        }]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录',
            isKey: false
        }
    },
    {
        path: '/logon',
        name: 'Logon',
        component: Logon,
        meta: {
            title: '注册',
            isKey: false
        }
    },
    {
        path: '/forgetPass',
        name: 'ForgetPass',
        component: ForgetPass,
        meta: {
            title: '忘记密码',
            isKey: false
        }
    },
    {
        path: '/reviseUser',
        name: 'ReviseUser',
        component: ReviseUser,
        meta: {
            title: '修改用户信息',
            isKey: false
        }
    },
]