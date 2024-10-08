<script setup lang="ts">
import xlr from "@/components/xlr.vue";
import dly from "@/components/dly.vue";
import askGod from "@/components/askGod.vue";
</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane label="小六壬推演">
      <xlr />
    </el-tab-pane>
    <el-tab-pane label="活数起课">
      <askGod />
    </el-tab-pane>
    <el-tab-pane label="大六爻推演(简化)">
      <dly />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped></style>
