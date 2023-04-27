<template>
  <view class="ix-layout">
    <slot></slot>
    <ix-tab-bar></ix-tab-bar>
  </view>
</template>

<script setup>
import IxTabBar from '~/layout/components/tab_bar/TabBar.vue';
</script>
