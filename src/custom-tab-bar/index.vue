<template>
  <cover-view class="tabbar">
    <!-- 下方四个tabitem -->
    <cover-view
      class="tabbar-item"
      v-for="(item, index) in list"
      :key="index"
      @tap="switachtab(index, item.pagePath)"
    >
      <cover-image
        :src="selectIndex ? item.iconPath : item.selectedIconPath"
        class="tabbar-image"
      ></cover-image>
      <cover-view :class="{ active: store.selectIndex === index }">
        {{ item.text }}
      </cover-view>
    </cover-view>
    <!-- 定位的+号item -->
    <view
      class="position-Item-border"
      @tap="switachtab(-1, '/pages/Search/index')"
    >
      <view class="position-item">
        <cover-image
          src="../images/tabbar-icon/jiahao.png"
          class="position-item-img"
        />
      </view>
    </view>
  </cover-view>
</template>
    
<script setup lang='ts'>
import { useTabbarStore } from "../store/index";
import Taro from "@tarojs/taro";
const store = useTabbarStore();
const list = [
  {
    text: "新鲜事",
    pagePath: "/pages/index/index",
    iconPath: "../images/tabbar-icon/xingqiu.png",
    selectedIconPath: "../images/tabbar-icon/xingqiu-copy.png",
  },
  {
    text: "话题",
    pagePath: "/pages/TopicConversation/index",
    iconPath: "../images/tabbar-icon/xingqiu.png",
    selectedIconPath: "../images/tabbar-icon/xingqiu-copy.png",
  },
  {
    text: "通知",
    pagePath: "/pages/Notice/index",
    iconPath: "../images/tabbar-icon/xingqiu.png",
    selectedIconPath: "../images/tabbar-icon/xingqiu-copy.png",
  },
  {
    text: "我的",
    pagePath: "/pages/MyInformation/index",
    iconPath: "../images/tabbar-icon/xingqiu.png",
    selectedIconPath: "../images/tabbar-icon/xingqiu-copy.png",
  },
];
const selectIndex = store.selectIndex;
//点击tabbar-item后触发
const switachtab = (index, path) => {
  changgeSelectIndex(index);
  Taro.switchTab({ url: path });
  // Taro.navigateTo({ url: path });
};
//更改store中的selectindex，以此修改tabbar中的样式
const changgeSelectIndex = (index) => {
  store.incrementSelectIndex(index);
};
</script>
    
<style lang="less">
.tabbar {
  overflow: visible;
  margin: 0;
  padding: 10px 50px;
  box-sizing: border-box;
  width: 100%;
  height: 130px;
  background-color: #feda48;
  display: flex;
  justify-content: space-between;
  position: relative;
  .tabbar-item {
    display: flex;
    font-size: 30px;
    flex-direction: column;
    align-items: center;
    .tabbar-image {
      width: 50px;
      height: 50px;
    }
  }
  .position-Item-border {
    position: absolute;
    left: 50%;
    top: 0px;
    transform: translate(-50%, -50%);
    height: 100px;
    width: 100px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    .position-item {
      background: #feda48;
      height: 90px;
      width: 90px;
      border-radius: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      .position-item-img {
        height: 80px;
        width: 80px;
      }
    }
  }
}
.active {
  color: white;
}
</style>