import Vue from 'vue'
import Vuex from 'vuex'
import menu from './menu';
import userLoad from "./userLoad";
import menuRoutes from "./menuRoutes";

Vue.use(Vuex)

export default new Vuex.Store({

  // 严格模式
  strict: true,

  modules: {
    menu,
    userLoad,
    menuRoutes,
  }
})
