<template>
  <div class="home">
    <!-- 左侧导航栏 -->
    <Sidebar :key="key" />
    <!-- 右侧内容区 -->
    <div class="main-app" :class="{ menuShow: $store.state.menu.collapsed }">
      <!-- 内容区头部 -->
      <Head />
      <!-- 内容区主体 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Head from "./components/Head.vue";
export default {
  components: {
    Sidebar,
    Head
  },
  data() {
    return {
      key: new Date().getTime()
    }
  },
  watch: {
    $route() {
      this.key = new Date().getTime()
    }
  }
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
</style>

