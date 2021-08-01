<template>
  <div class="basic-container">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item label="标题" required prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-textarea v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required prop="category">
        <a-select
          allowClear
          v-model="form.category"
          placeholder="请选择商品类别"
          @change="handleChange"
        >
          <a-select-option
            v-for="item in categoryList"
            :key="item.id"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
        <a-select allowClear v-model="form.c_item" placeholder="请添加子类名">
          <a-select-option v-for="c in categoryItem" :key="c" :value="c">{{
            c
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" required prop="tags">
        <a-select
          mode="tags"
          :default-value="['包邮,最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮,最晚次日达">
            包邮,最晚次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="" :wrapperCol="{span: 24}">
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import cate from "@/api/category";
export default {
  props: ["form"],
  data() {
    return {
      rules: {},
      categoryList: [],
      categoryItem: [],
    };
  },
  created() {
    cate.categoryList().then((resp) => {
      this.categoryList = resp.data.data;
    });
  },
  methods: {
    handleChange(category) {
      this.categoryItem = this.categoryList.filter((it) => {
        return it.id == category;
      })[0].c_items;
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit("next");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>