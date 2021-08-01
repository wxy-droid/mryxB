<template>
  <a-table 
  :columns="columns" 
  :data-source="data" 
  :pagination="page"
  @change="handleChange"
  >
    <div slot="operation" slot-scope="text, record">
      <a-button @click.prevent="handleEdit(record)">编辑</a-button>
      <a-button @click.prevent="handleRemove(record)">删除</a-button>
    </div>
  </a-table>
</template>

<script>
const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" },
  },
];
export default {
  props: ["cateData","page"],
  data() {
    return {
      columns,
    };
  },
  computed: {
    data() {
      return this.cateData.map((it) => {
        return {
          ...it,
          key: it.id,
        };
      });
    },
  },
  methods: {
      handleChange(page){
        //   当页面发送改变时
        this.$emit('changePage',page);
      },
      handleEdit(record) {
        this.$emit('edit',record);
      },
      handleRemove(record) {
        this.$emit('remove',record);
      }
  }
};
</script>

<style>
</style>