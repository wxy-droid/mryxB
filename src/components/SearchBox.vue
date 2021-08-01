<template>
  <div class="product-list">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="搜索关键字">
        <a-input v-model="searchForm.searchWord" placeholder="请输入关键字">
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="商品类名">
        <a-select
          allowClear
          show-search
          placeholder="请选择类名"
          style="width: 200px"
          @change="handleChange"
        >
          <a-select-option
            v-for="item in categoryLists"
            :value="item.id"
            :key="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  props: ['categoryLists'],
  data() {
    return {
      searchForm: {
        searchWord: "",
        category: "",
      },
    };
  },
  methods: {
    // 提交时触发
    handleSubmit(e) {
      this.$emit("vsubmit", this.searchForm);
    },
    // 改变下拉菜单时触发
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
};
</script>

<style leng="less">
.product-list {
  padding: 10px 40px;
}
</style>
