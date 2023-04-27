<template>
  <text :class="['iconfont', `icon-${name}`]" :style="{ fontSize: `${size}px` }"></text>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  size: number;
  name: string;
}>();
</script>
