<template>
  <div class="article-loader">
    <view class="article-loader__item">
      <nut-skeleton width="340px" height="15px" animated row="3" :round="true"></nut-skeleton>
    </view>
    <view class="article-loader__item">
      <nut-skeleton width="340px" height="15px" animated row="3" :round="true"></nut-skeleton>
    </view>
    <view class="article-loader__item">
      <nut-skeleton width="340px" height="15px" animated row="3" :round="true"></nut-skeleton>
    </view>
    <view class="article-loader__item">
      <nut-skeleton width="340px" height="15px" animated row="3" :round="true"></nut-skeleton>
    </view>
  </div>
</template>

<script setup>
import { Skeleton as NutSkeleton } from '@nutui/nutui-taro';
</script>

<style lang="scss">
.article-loader {
  &__item {
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    margin-bottom: 25px;
  }
}
</style>
