<template>
  <a-table 
  :columns="columns" 
  :data-source="data"
  :pagination="page"
  @change="onChange"
  >
    <div slot="operation" class="slot-btn" slot-scope="text, record">
      <a-button @click.prevent="handleEdit(record)">编辑</a-button>
      <a-button @click.prevent="handleRemove(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
import products from "@/api/products";
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    ellipsis: true,
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc",
    ellipsis: true,
  },
  {
    title: "类名",
    dataIndex: "categoryName",
    key: "category",
    ellipsis: true,
  },
  {
    title: "预售价格",
    dataIndex: "price",
    key: "price",
    ellipsis: true,
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    key: "price_off",
    ellipsis: true,
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
    ellipsis: true,
  },
  {
    title: "限制购买数量",
    dataIndex: "inventory",
    key: "inventory",
    ellipsis: true,
  },
  {
    title: "上架状态",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    customRender : (text, record) => {
      return record.status === 1 ? '上架' : '下架';
    }
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  // 传过来的商品列表数据和分页数据
  props: ["tableData","page"],
  data() {
    return {
      columns,
    };
  },
  computed: {
    // 给每个商品都加上一个key值
    data() {
      return this.tableData.map((it) => {
        return {
          ...it,
          key: it.id,
        };
      });
    },
  },
  methods: {
    // 当点击分页时将分页数据传给父组件
    onChange(page) {
      this.$emit('changePage', page);
    },
    // 商品编辑
    handleEdit(record) {
      this.$emit('edit',record);
    },
    // 商品删除
    handleRemove(record) {
      this.$emit('remove',record);
    }
  }
};
</script>

<style>
.slot-btn {
  display: flex;
}
</style>
