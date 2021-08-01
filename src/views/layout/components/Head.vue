<template>
  <div class="main-header">
    <!-- 导航栏按钮 -->
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon
        :type="$store.state.menu.collapsed ? 'menu-unfold' : 'menu-fold'"
      />
    </a-button>
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <a-breadcrumb v-if="currentRouters.length > 1">
        <a-breadcrumb-item>
          {{ currentRouters[0] ? currentRouters[0].meta.title : ''}}
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{name: currentRouters[1].name}">
            {{ currentRouters[1] ? currentRouters[1].meta.title : '' }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="user">
      <ul class="user-list">
        <li>
          欢迎{{ $store.state.userLoad.user.username }}
          <a-icon type="down" />
        </li>
        <li @click="handleResive">修改用户信息</li>
        <li @click="handleClick">退出</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRouters: this.$route.matched,
    };
  },
  watch: {
    $route() {
      this.currentRouters = this.$route.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch("menu/changeCollapsed");
    },
    handleClick() {
      this.$store.dispatch("userLoad/userLoginOut");
      this.$router.push({
        name: "Login",
      });
    },
    handleResive() {
      this.$router.push({
        name: "ReviseUser",
      });
    },
  },
};
</script>

<style>
</style>