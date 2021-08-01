<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[
        $router.currentRoute.matched[1]
          ? $router.currentRoute.matched[1].name
          : '',
      ]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.menu.collapsed"
    >
      <a-sub-menu
        v-for="route in $store.state.menuRoutes.newsRouters"
        :key="route.name"
        v-if="route.meta.isKey"
      >
        <span slot="title">
          <a-icon :type="route.meta.icon" />
          <span>{{ route.meta.title }}</span>
        </span>
          <a-menu-item 
          v-for="child in route.children" 
          :key="child.name"
          v-if="child.meta.isKey"
          >
            <router-link :to="{ name: child.name }">
              <a-icon :type="child.meta.icon" />
              {{ child.meta.title }}
            </router-link>
          </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  watch: {
    $route() {
      console.log(this.$route);
    }
  }
};
</script>
