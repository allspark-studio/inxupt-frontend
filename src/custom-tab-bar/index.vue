<template>
  <cover-view class="tabbar">
    <cover-view
      class="tabbar-item"
      v-for="(item, index) in list"
      :key="index"
      @tap="switachtab(index, item.pagePath)"
    >
      <image src="../image/tabbar_cart_on.png" class="tabbar-image"></image>
      <cover-view>{{ item.text }}</cover-view>
    </cover-view>
    <!-- <cover-view class="tabbar-item">
      <image src="../image/tabbar_cart_on.png" class="tabbar-image"></image>
      <cover-view>圈子</cover-view>
    </cover-view>
    <cover-view class="tabbar-item">
      <image src="../image/tabbar_cart_on.png" class="tabbar-image"></image>
      <cover-view>消息</cover-view>
    </cover-view>
    <cover-view class="tabbar-item">
      <image src="../image/tabbar_cart_on.png" class="tabbar-image"></image>
      <cover-view>我的</cover-view>
    </cover-view> -->
  </cover-view>
</template>
    
<script setup lang='ts'>
const list = [
  {
    text: "新鲜事",
    pagePath: "/page/index/index",
    iconPath: "../image/tabbar_cart_on.png",
  },
  {
    text: "话题",
    pagePath: "/page/topicConversation/index",
    iconPath: "../image/tabbar_cart_on.png",
  },
  {
    text: "通知",
    pagePath: "/page/notice/index",
    iconPath: "../image/tabbar_cart_on.png",
  },
  {
    text: "我的",
    pagePath: "/page/myInformation/index",
    iconPath: "../image/tabbar_cart_on.png",
  },
];
const switachtab = (index, path) => {
  console.log(index, path);
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
</style>