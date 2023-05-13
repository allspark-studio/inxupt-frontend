<template>
  <ul class="switch">
    <li
      :class="{ active: index === currentIndex }"
      v-for="(item, index) in switches"
      :key="index"
      @click="selectItem(index)"
    >
      {{ item.title }}
    </li>
  </ul>
</template>
<script setup lang="ts">
defineProps(['switches', 'currentIndex']);
const emit = defineEmits(['switch']);
const selectItem = (index) => {
  emit('switch', index);
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
