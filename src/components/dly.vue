<script setup lang="ts">
import { ref } from "vue";

// 定义六爻生成器
const generateYao = (): number[] => {
  const yao = [];
  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * 4) + 1; // 1-4之间随机数
    yao.push(random);
  }
  return yao;
};

// 卦象库（64卦，简化）
const guaMap: Record<string, { name: string; description: string }> = {
  "111111": { name: "乾卦", description: "元，亨，利，贞。" },
  "000000": { name: "坤卦", description: "元亨，利牝马之贞。" },
  "100010": { name: "屯卦", description: "元亨，利贞，勿用有攸往，利建侯。" },
  "010001": { name: "蒙卦", description: "亨。匪我求童蒙，童蒙求我。" },
  "111010": { name: "需卦", description: "有孚，光亨，贞吉，利涉大川。" },
  "010111": {
    name: "讼卦",
    description: "有孚窒惕，中吉，终凶。利见大人，不利涉大川。",
  },
  "010000": { name: "师卦", description: "贞，丈人吉，无咎。" },
  "000010": { name: "比卦", description: "吉。原筮，元永贞，无咎。" },
};
const initialGuaExplanation = ref<string>(""); // 初卦解释
const changedGuaExplanation = ref<string>(""); // 变卦解释

// 生成初卦
const generateHexagram = (yao: number[]): string => {
  let hexagram = "";
  for (let i = 0; i < 6; i++) {
    hexagram += yao[i] % 2 === 1 ? "1" : "0"; // 阳爻为 1，阴爻为 0
  }
  return hexagram;
};

// 变卦生成逻辑
const generateChangedHexagram = (yao: number[]): string => {
  const changedYao = yao.map((y) => (y % 2 === 0 ? 1 - (y % 2) : y % 2)); // 动爻变卦
  return generateHexagram(changedYao);
};

// 数据存储
const yaoList = ref<number[]>([]); // 存储六爻
const initialGua = ref<string>(""); // 初卦
const changedGua = ref<string>(""); // 变卦
const showResult = ref(false); // 控制结果显示

// 逐个生成六爻并展示过程
const runDivination = async () => {
  showResult.value = false; // 重置显示状态
  yaoList.value = []; // 清空六爻显示

  const yao = generateYao(); // 生成六爻

  // 模拟逐步显示六爻生成过程
  for (let i = 0; i < 6; i++) {
    yaoList.value.push(yao[i]);
    await new Promise((resolve) => setTimeout(resolve, 500)); // 延迟500ms逐步显示
  }

  // 等待所有六爻显示后，推演卦象
  const hexagram = generateHexagram(yao);
  const initial = guaMap[hexagram] || { name: "未知卦象", description: "" };
  initialGua.value = initial.name;
  initialGuaExplanation.value = initial.description;

  const changedHexagram = generateChangedHexagram(yao);
  const changed = guaMap[changedHexagram] || {
    name: "未知卦象",
    description: "",
  };
  changedGua.value = changed.name;
  changedGuaExplanation.value = changed.description;

  // 显示结果
  showResult.value = true;
};
</script>

<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold text-center mb-6">大六爻推演</h1>
  
      <!-- 生成六爻按钮 -->
      <el-button type="primary" class="w-full" @click="runDivination">生成六爻并推演</el-button>
  
      <!-- 六爻生成过程显示 -->
      <div class="mt-6 flex justify-center space-x-2">
        <div v-for="(yao, index) in yaoList" :key="index" class="yao-item">
          <transition name="fade">
            <div :class="{'yin-yao': yao % 2 === 0, 'yang-yao': yao % 2 === 1}">
              {{ yao % 2 === 1 ? '━' : ' ' }} {{ yao % 2 === 0 ? '阴爻' : '阳爻' }}
            </div>
          </transition>
        </div>
      </div>
  
      <!-- 渐显结果 -->
      <transition name="fade">
        <div v-if="showResult" class="mt-6 text-center">
          <div class="text-xl font-bold">初卦: {{ initialGua }}</div>
          <p class="text-gray-600">{{ initialGuaExplanation }}</p>
  
          <div class="text-xl font-bold mt-4">变卦: {{ changedGua }}</div>
          <p class="text-gray-600">{{ changedGuaExplanation }}</p>
        </div>
      </transition>
    </div>
  </template>
  

<style scoped>
/* 渐显动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 阴阳爻的样式 */
.yin-yao {
  color: #ff6347;
}

.yang-yao {
  color: #3f8cff;
}

.yao-item {
  font-size: 24px;
  font-weight: bold;
}
</style>
