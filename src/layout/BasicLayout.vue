<template>
  <nut-config-provider :theme-vars="themeVars">
    <view class="ix-layout">
      <slot></slot>
      <ix-tab-bar></ix-tab-bar>
    </view>
  </nut-config-provider>
</template>

<script setup>
import { ConfigProvider as NutConfigProvider } from '@nutui/nutui-taro';
import { reactive } from 'vue';
import IxTabBar from '~/layout/components/tab_bar/TabBar.vue';

const themeVars = reactive({
  primaryColor: '#FEDA48',
  primaryColorEnd: '#FDE8B8',
  buttonPrimaryColor: '#000000',
});
</script>

<style lang="scss">
.ix-layout {
  padding-bottom: $tab-bar-height;
}
</style>
