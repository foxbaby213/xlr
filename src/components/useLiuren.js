// composables/useLiuren.js
import { ref } from 'vue';

export function useLiuren() {
  const tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const changsheng = {
    土: ['辰', '戌', '丑', '未'],
    金: ['申', '酉'],
    水: ['亥', '子'],
    木: ['寅', '卯'],
    火: ['巳', '午']
  };

  const selectedTiangan = ref(null);
  const selectedDizhi = ref(null);
  const result = ref(null);

  const calculateResult = () => {
    if (selectedTiangan.value && selectedDizhi.value) {
      result.value = `天干: ${selectedTiangan.value}, 地支: ${selectedDizhi.value}`;
    } else {
      result.value = '请选择天干和地支';
    }
  };

  return {
    tiangan,
    dizhi,
    selectedTiangan,
    selectedDizhi,
    result,
    calculateResult
  };
}
