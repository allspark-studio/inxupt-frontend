<template>
  <view class="tab-bar">
    <!-- 下方四个tabitem -->
    <view
      class="tab-bar-item"
      v-for="(item, index) in list"
      :key="index"
      @tap="switchTab(index, item.pagePath)"
    >
      <view class="tab-bar-icon">
        <img v-if="index === store.selectIndex" :src="item.selectedIconPath" />
        <img v-else :src="item.iconPath" />
      </view>
      <view :class="{ active: store.selectIndex === index }" v-if="index!==2">
        {{ item.text }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { useTabBarStore } from '~/store/index';
import { TAB_BAR_LIST } from '~/constants/config_constants';

const store = useTabBarStore();
const list = TAB_BAR_LIST;

// 更改 store 中的 selectIndex，以此修改 tab-bar 中的样式
function changeSelectIndex(index: number) {
  store.incrementSelectIndex(index);
}
// 点击 tab-bar-item后触发
function switchTab(index: number, path: string) {
  changeSelectIndex(index);
  Taro.switchTab({ url: `/${path}` });
}
</script>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  box-shadow: 0px 0px 30px rgba(165, 165, 165, 0.3);
  overflow: visible;
  margin: 0;
  padding: 15px 50px 25px 50px;
  box-sizing: border-box;
  width: 100%;
  height: $tab-bar-height;
  background-color: --nut-white;
  display: flex;
  justify-content: space-between;
  .tab-bar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: --nut-white;
    font-size: $tab-bar-font-size;
    .tab-bar-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      img {
        width: $tab-bar-icon-size;
        height: $tab-bar-icon-size;
      }
    }
  }
  :nth-child(3) {
    box-sizing: border-box;
    height: $tab-bar-center-btn-size;
    width: $tab-bar-center-btn-size;
    border-radius: 50%;
    transform: translate(0, -30%);
    .tab-bar-icon {
      background: $primary-color;
      height: $tab-bar-center-icon-size;
      width: $tab-bar-center-icon-size;
      border-radius: 50%;
      margin: 0;
    }
  }
}
.active {
  color: $tab-bar-selected-color;
}
</style>
