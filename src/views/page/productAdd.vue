<template>
  <div class="product-add">
    <a-steps :current="current" class="steps-title">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <Basic v-if="current === 0" :form="form" @next="next" />
      <Sell v-if="current === 1" :form="form" @prev="prev" @next="next" />
    </div>
  </div>
</template>

<script>
import Basic from "@/components/Basic.vue";
import Sell from "@/components/Sell.vue";
import products from "@/api/products";
export default {
  components: {
    Basic,
    Sell,
  },
  created() {
    let id = this.$route.params.id;
    if (id) {
      products.productsXian(id).then((resp) => {
        this.form = {
          ...resp.data,
          status1: !!resp.data.status,
        };
        console.log(this.form);
      });
    }
  },
  data() {
    return {
      current: 0,
      form: {
        title: "",
        desc: "",
        category: "",
        c_item: [],
        tags: [],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: "",
        images: [],
        status1: true,
      },
      steps: [
        {
          title: "填写商品基本信息",
        },
        {
          title: "填写商品销售信息",
        },
      ],
    };
  },
  methods: {
    next() {
      if (this.current === 1) {
        // console.log(this.form);
        if (this.$route.params.id) {
          // 编辑
          products
            .productsEdit({
              ...this.form,
            })
            .then(() => {
              this.$message.success("修改成功");
              this.$router.push({
                name: "ProductList",
              });
            });
        } else {
          // 新增
          products
            .productsAdd({
              ...this.form,
              status: this.form.status1 ? 1 : 0,
            })
            .then(() => {
              this.$message.success("新增成功");
              this.$router.push({
                name: "ProductList",
              });
            });
        }
      } else {
        this.current++;
      }
    },
    prev() {
      this.current--;
    },
  },
};
</script>
<style lang="less">
.product-add {
  .steps-title {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  .steps-action {
    margin-top: 24px;
  }
}
</style>