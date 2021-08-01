<template>
  <!-- 商品列表 -->
  <div class="productList-container">
    <!-- 搜索框 -->
    <SearchBox @vsubmit="submitSaerch" :categoryLists="categoryLists" />
    <a-button class="addBtn">
      <router-link :to="{ name: 'ProductAdd' }">新增商品</router-link>
    </a-button>
    <!-- 表格列表 -->
    <TableList
      :tableData="tableData"
      :page="page"
      @changePage="changePage"
      @edit="editProduct"
      @remove="removeProduct"
    />
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox.vue";
import TableList from "@/components/TableList.vue";
import products from "@/api/products";
import category from "@/api/category";
export default {
  components: {
    SearchBox,
    TableList,
  },
  data() {
    return {
      // 搜索框传过来的数据存储
      saerchData: {},
      // 商品列表存储数据
      tableData: [],
      // 分页数据
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      // 类名列表存储数据
      categoryLists: [],
      // 一个类名列表的映射
      categoryObj: {},
    };
  },
  created() {
    // 获取类名列表
    category.categoryList().then((resp) => {
      this.categoryLists = resp.data.data;
      this.categoryLists.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getProductList();
  },
  methods: {
    // 搜索
    submitSaerch(formData) {
      this.saerchData = formData;
      this.getProductList();
    },
    // 异步获取商品列表
    getProductList() {
      products
        .productsAll({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.saerchData,
        })
        .then((resp) => {
          this.page.total = resp.data.total;
          this.tableData = resp.data.data.map((it) => {
            return {
              ...it,
              categoryName: this.categoryObj[it.category].name,
            };
          });
        });
    },
    // 翻页
    changePage(pageData) {
      this.page = pageData;
      this.getProductList();
    },
    // 编辑
    editProduct(record) {
      this.$router.push({
        name: "ProductEdit",
        params: {
          id: record.id,
        },
      });
    },
    // 删除
    removeProduct(record) {
      this.$confirm({
        title: "确认删除?",
        content: () => (
          <div style="color:red;">{"商品标题为:" + record.title}</div>
        ),
        onOk:() => {
          products.productsRemove({
            id: record.id
          }).then( resp => {
            this.getProductList();
          })
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "removeque",
      });
    },
  },
};
</script>

<style lang="less">
.productList-container {
  position: relative;
  .addBtn {
    position: absolute;
    top: 15px;
    right: 15px;
  }
}
</style>