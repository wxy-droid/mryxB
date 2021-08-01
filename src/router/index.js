import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';
import store from '../store';
import getMenuRouter from '../utils/permission';
import Home from '../views/layout/Home.vue'

Vue.use(VueRouter);

// 异步路由 嵌套路由
const asyncRotuerMap = [{
  path: '/product',
  name: 'Product',
  component: Home,
  meta: {
    title: '商品',
    isKey: true,
    icon: 'inbox'
  },
  children: [
    {
      path: 'productList',
      name: 'ProductList',
      component: () => import(/* webpackChunkName: "productList" */'../views/page/productList.vue'),
      meta: {
        title: '商品列表',
        icon: 'unordered-list',
        isKey: true,
      }
    },
    {
      path: 'productAdd',
      name: 'ProductAdd',
      component: () => import(/* webpackChunkName: "productAdd" */'../views/page/productAdd.vue'),
      meta: {
        title: '新增商品',
        icon: 'file-add',
        isKey: true,
      }
    },
    {
      path: 'productEdit/:id',
      name: 'ProductEdit',
      component: () => import(/* webpackChunkName: "productEdit" */'../views/page/productAdd.vue'),
      meta: {
        title: '编辑商品',
        icon: 'file-add',
        isKey: false,
      }
    },
    {
      path: 'category',
      name: 'Category',
      component: () => import(/* webpackChunkName: "category" */'../views/page/category.vue'),
      meta: {
        title: '类名管理',
        icon: 'project',
        isKey: true,
      }
    }
  ]
}];

const router = new VueRouter({
  routes,
  mode: "history"
})

let isMenuRouter = true;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (to.path === '/logon' || to.path === '/forgetPass' || to.path === '/reviseUser') {
      return next();
    }
    if (store.state.userLoad.user.appkey && store.state.userLoad.user.role) {
      if (isMenuRouter) {
        const menuRouter = getMenuRouter(asyncRotuerMap, store.state.userLoad.user.role);
        store.dispatch('menuRoutes/changeNewsRouters',routes.concat(menuRouter)).then( () => {
          router.addRoutes(menuRouter);
          return next();
        });
        isMenuRouter = false;
      }
      return next();
    }
    return next('/login');
  }
  return next();
})

export default router
