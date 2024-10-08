<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";

// 定义月份、日期和时辰的输入
const month = ref<number | null>(null);
const day = ref<number | null>(null);
const hour = ref<number | null>(null); // 对应时辰的数字
const result = ref<string>("");

// 小六壬的符号列表
const elements = [
  "大安",
  "留连",
  "速喜",
  "赤口",
  "小吉",
  "空亡",
  "病符",
  "桃花",
  "天德",
];

// 时辰与数字的映射
const hoursOptions = [
  { label: "子时 (23:00-01:00)", value: 1 },
  { label: "丑时 (01:00-03:00)", value: 2 },
  { label: "寅时 (03:00-05:00)", value: 3 },
  { label: "卯时 (05:00-07:00)", value: 4 },
  { label: "辰时 (07:00-09:00)", value: 5 },
  { label: "巳时 (09:00-11:00)", value: 6 },
  { label: "午时 (11:00-13:00)", value: 7 },
  { label: "未时 (13:00-15:00)", value: 8 },
  { label: "申时 (15:00-17:00)", value: 9 },
  { label: "酉时 (17:00-19:00)", value: 10 },
  { label: "戌时 (19:00-21:00)", value: 11 },
  { label: "亥时 (21:00-23:00)", value: 12 },
];

// 推演函数
const getElements = () => {
  if (month.value === null || day.value === null || hour.value === null) {
    ElMessage({
      message: "请输入完整的月份、日期和时辰！",
      type: "warning",
    });
    return;
  }

  const firstIndex = (month.value - 1) % elements.length;
  const secondIndex = (month.value + day.value - 2) % elements.length;
  const thirdIndex =
    (month.value + day.value + hour.value - 3) % elements.length;

  result.value = `${elements[firstIndex]}, ${elements[secondIndex]}, ${elements[thirdIndex]}`;
};

// 当选择时辰时，将其值填入输入框
const handleHourChange = (value: number) => {
  hour.value = value;
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg">
    <h1 class="text-2xl font-semibold text-center mb-6">小六壬推演</h1>

    <!-- 月份输入框 -->
    <div class="mb-4">
      <el-input
        v-model.number="month"
        placeholder="请输入月份"
        type="number"
        min="1"
        max="12"
        clearable
      />
    </div>

    <!-- 日期输入框 -->
    <div class="mb-4">
      <el-input
        v-model.number="day"
        placeholder="请输入日期"
        type="number"
        min="1"
        max="31"
        clearable
      />
    </div>

    <!-- 时辰输入框 -->
    <div class="mb-4">
      <el-input
        v-model.number="hour"
        placeholder="数字"
        type="number"
        clearable
      />
    </div>

    <!-- 时辰下拉框 -->
    <div class="mb-4">
      <el-select
        v-model="hour"
        placeholder="请选择时辰"
        @change="handleHourChange"
        clearable
      >
        <el-option
          v-for="option in hoursOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </div>

    <!-- 计算按钮 -->
    <el-button type="primary" class="w-full" @click="getElements"
      >计算结果</el-button
    >

    <!-- 结果展示 -->
    <div v-if="result" class="mt-6 text-center text-xl font-bold">
      结果: {{ result }}
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #3f8cff;
}

.el-input,
.el-select {
  width: 100%;
}

.el-button {
  background-color: #3f8cff;
}
</style>
