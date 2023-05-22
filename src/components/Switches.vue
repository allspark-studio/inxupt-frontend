<template>
  <ul class="switch" @click="handleStateChange">
    <li :class="{ active: switchState }">
      {{ activeText }}
    </li>
    <li :class="{ active: !switchState }">
      {{ inactiveText }}
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  activeText: {
    type: String,
    default: '开',
  },
  inactiveText: {
    type: String,
    default: '关',
  },
});
const emit = defineEmits(['change']);
const switchState = ref(true);
const handleStateChange = () => {
  switchState.value = !switchState.value;
  emit('change', switchState.value);
};
</script>
<style lang="scss">
.switch {
  width: 160px;
  height: 40px;
  border-radius: 24px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  li {
    flex: 1;
    text-align: center;
    color: #a9a9a9;
  }
  li:first-child {
    margin-right: -20px;
  }
  .active {
    background: #f4f5f9;
    color: black;
    font-weight: bold;
    border-radius: 20px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
