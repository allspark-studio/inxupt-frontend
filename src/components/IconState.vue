<template>
  <div
    class="action"
    @click="changeState"
    :style="{ color: data.isClick ? props.activeColor : props.normalColor ?? 'inherit' }"
  >
    <slot />
    <span class="sum">{{ data.sum }}</span>
  </div>
</template>

<script setup lang="ts">
// todo： 考虑是否直接继承IconSum
import { useDebounceFn } from '@vueuse/core';
import { watchEffect, reactive } from 'vue';

const props = defineProps<{
  initialSum: number;
  initialClick?: boolean;
  activeColor: string;
  normalColor?: string;
}>();
const data = reactive({
  isClick: props.initialClick ?? false,
  sum: props.initialSum,
});
const emit = defineEmits<{
  (event: 'onChange', state: boolean): void;
}>();

watchEffect(() => {
  data.isClick = props.initialClick ?? false;
  data.sum = props.initialSum;
});
const changeState = useDebounceFn(() => {
  if (data.isClick) {
    data.sum -= 1;
    emit('onChange', false);
  } else {
    data.sum += 1;
    emit('onChange', true);
  }
  data.isClick = !data.isClick;
}, 50);
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
