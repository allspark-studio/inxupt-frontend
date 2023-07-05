<template>
  <div class="action" :style="{ color: props.normalColor ?? 'inherit' }">
    <slot />
    <span class="sum">{{ data.sum }}</span>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, reactive } from 'vue';

const props = defineProps<{
  initialSum: number;
  normalColor?: string;
}>();
const data = reactive({
  sum: props.initialSum,
});

watchEffect(() => {
  data.sum = props.initialSum;
});
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
