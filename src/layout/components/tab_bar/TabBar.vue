<template>
  <view class="tabbar">
    <!-- 下方四个tabitem -->
    <view
      class="tabbar-item"
      v-for="(item, index) in list"
      :key="index"
      @tap="switchTab(index, item.pagePath)"
    >
      <view class="tabbar-icon">
        <ix-icon name="jiahao" :size="24"></ix-icon>
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
import IxIcon from '~/components/icon/Icon.vue';

const store = useTabBarStore();
const list = [
  {
    text: '新鲜事',
    pagePath: '/pages/index/index',
    iconPath: '/images/tabbar-icon/xingqiu.png',
    selectedIconPath: '/images/tabbar-icon/xingqiu-selected.png',
  },
  {
    text: '话题',
    pagePath: '/pages/TopicConversation/index',
    iconPath: '/images/tabbar-icon/xingqiu.png',
    selectedIconPath: '/images/tabbar-icon/xingqiu-selected.png',
  },
  {
    text: '',
    pagePath: '/pages/Search/index',
    iconPath: '/images/tabbar-icon/xingqiu.png',
    selectedIconPath: '/images/tabbar-icon/xingqiu-selected.png',
  },
  {
    text: '通知',
    pagePath: '/pages/Notice/index',
    iconPath: '/images/tabbar-icon/xingqiu.png',
    selectedIconPath: '/images/tabbar-icon/xingqiu-selected.png',
  },
  {
    text: '我的',
    pagePath: '/pages/MyInformation/index',
    iconPath: '/images/tabbar-icon/xingqiu.png',
    selectedIconPath: '/images/tabbar-icon/xingqiu-selected.png',
  },
];
// 更改store中的selectindex，以此修改tabbar中的样式
const changeSelectIndex = (index) => {
  store.incrementSelectIndex(index);
};
// 点击tabbar-item后触发
function switchTab(index: number, path: string) {
  changeSelectIndex(index);
  Taro.switchTab({ url: path });
}
</script>

<style lang="less">
.tabbar {
  box-shadow: 0rpx -15rpx 20rpx 2rpx rgba(165, 165, 165, 0.34);
  overflow: visible;
  margin: 0;
  padding: 10px 50px;
  box-sizing: border-box;
  width: 100%;
  height: 130px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  .tabbar-item {
    display: flex;
    font-size: 25px;
    flex-direction: column;
    font-weight: bold;
    align-items: center;
    .tabbar-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
    }
  }
  :nth-child(3) {
    box-sizing: border-box;
    height: 130px;
    width: 130px;
    border-radius: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    transform: translate(0, -30%);
    .tabbar-icon {
      background: #feda48;
      height: 110px;
      width: 110px;
      border-radius: 55px;
      margin: 0;
    }
  }
}
.active {
  color: #feda48;
}
</style>
