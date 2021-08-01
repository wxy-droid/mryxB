<template>
  <div class="category-container">
    <div class="category-add">
      <a-button @click="showDrawer">新增类目</a-button>
    </div>

    <CategoryTable
      :cateData="cateData"
      :page="page"
      @changePage="currentPage"
      @edit="handleEdit"
      @remove="handleRemove"
    />
    <div class="mask">
      <a-drawer
        placement="right"
        width="700"
        :closable="true"
        :visible="visible"
        @close="onClose"
      >
        <div class="cateForm">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 15 }"
          >
            <a-form-model-item label="商品类目id" required prop="id">
              <a-input v-model="form.id" />
            </a-form-model-item>
            <a-form-model-item label="商品类目名称" required prop="name">
              <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item label="商品子类目" required prop="c_items">
              <a-select
                mode="tags"
                :default-value="['啤酒']"
                v-model="form.c_items"
              >
                <a-select-option value="啤酒"> 啤酒 </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item
              label=""
              class="cate-btn"
              :wrapper-col="{ span: 24 }"
            >
              <a-button type="primary" @click="submitClick">提交</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import CategoryTable from "@/components/CategoryTable.vue";
import category from "@/api/category";
export default {
  components: {
    CategoryTable,
  },
  data() {
    return {
      // 遮罩层是否显示
      visible: false,
      // 类名列表
      cateData: [],
      rules: {},
      form: {
        id: "",
        name: "",
        c_items: [],
      },
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    showDrawer() {
      this.form = {
        id: "",
        name: "",
        c_items: [],
      };
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    // 异步获取类目数据
    getCategoryList() {
      category
        .categoryList({
          page: this.page.current,
          size: this.page.pageSize,
        })
        .then((resp) => {
          this.cateData = resp.data.data;
        });
    },
    // 分页
    currentPage(pageData) {
      this.page = pageData;
      this.getCategoryList();
    },
    // 编辑
    handleEdit(record) {
      this.visible = true;
      this.form = record;
    },
    // 删除
    handleRemove(record) {
      category.categoryRemove(record.id).then((resp) => {
        this.$message.success("删除成功");
        this.getCategoryList();
      });
    },
    // 提交
    submitClick() {
      if (this.form.appkey) {
        category.categoryEdit(this.form).then((resp) => {
          this.onClose();
          this.$message.success("修改成功");
          this.getCategoryList();
        });
      } else {
        // 新增类名接口绝对有问题 参数正确就是报错
        category.categoryAdders({
          ...this.form
        }).then((resp) => {
          console.log(resp);
        });
      }
    },
  },
};
</script>

<style lang="less">
.category-add {
  overflow: hidden;
  button {
    margin: 10px 40px;
    float: right;
  }
}
.cateForm {
  margin-top: 100px;
  div {
    margin-bottom: 20px;
  }
  .cate-btn {
    .ant-form-item-control {
      text-align: center;
    }
  }
}
</style>