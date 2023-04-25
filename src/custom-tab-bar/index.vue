<template>
  <cover-view class="tabbar">
    <cover-view
      class="tabbar-item"
      v-for="(item, index) in list"
      :key="index"
      @tap="switachtab(index, item.pagePath)"
    >
      <image src="../image/tabbar_cart_on.png" class="tabbar-image"></image>
      <cover-view :class="{ active: store.selectIndex === index }">{{
        item.text
      }}</cover-view>
    </cover-view>
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
    iconPath: "../image/tabbar_cart_on.png",
  },
  {
    text: "话题",
    pagePath: "/pages/topicConversation/index",
    iconPath: "../image/tabbar_cart_on.png",
  },
  {
    text: "通知",
    pagePath: "/pages/notice/index",
    iconPath: "../image/tabbar_cart_on.png",
  },
  {
    text: "我的",
    pagePath: "/pages/myInformation/index",
    iconPath: "../image/tabbar_cart_on.png",
  },
];
//点击tabbar-item后触发
const switachtab = (index, path) => {
  console.log(index, path);
  changgeSelectIndex(index);
  Taro.switchTab({ url: path });
};
//更改store中的selectindex，以此修改tabbar中的样式
const changgeSelectIndex = (index) => {
  store.incrementSelectIndex(index);
};
</script>
    
<style lang="less">
.tabbar {
  margin: 0;
  padding: 10px 50px;
  box-sizing: border-box;
  width: 100%;
  height: 130px;
  background-color: pink;
  display: flex;
  justify-content: space-between;
  .tabbar-item {
    display: flex;
    font-size: 30px;
    flex-direction: column;
    .tabbar-image {
      width: 50px;
      height: 50px;
    }
  }
}
.active {
  color: red;
}
</style>