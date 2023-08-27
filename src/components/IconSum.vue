<template>
  <div class="action" :style="{ color: props.normalColor ?? 'inherit' }">
    <slot />
    <span class="sum">{{ props.sum }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  sum: number;
  normalColor?: string;
}>();
</script>

<style lang="scss" module>
.action {
  display: flex;
  align-items: center;
}
.sum {
  margin-left: 8rpx;
}
</style>
