<template>
  <div class="statistics-container">
    <!-- 卡片 -->
    <Card />
    <!-- 折线图 -->
    <Charts />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Charts from "../../components/Charts.vue";
export default {
  components: {
    Card,
    Charts,
  }
}
</script>

<style>

</style>