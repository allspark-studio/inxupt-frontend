<template>
  <div class="user-info-loader">
    <nut-skeleton
      width="710rpx"
      height="300rpx"
      row="1"
      :title="false"
      round
      animated
    ></nut-skeleton>
    <nut-skeleton
      style="margin-top: 30rpx"
      width="500rpx"
      row="3"
      round
      animated
      avatar
    ></nut-skeleton>
    <nut-skeleton
      style="margin-top: 30rpx"
      width="500rpx"
      row="3"
      round
      animated
      avatar
    ></nut-skeleton>
    <nut-skeleton
      style="margin-top: 30rpx"
      width="500rpx"
      row="3"
      round
      animated
      avatar
    ></nut-skeleton>
  </div>
</template>

<script setup lang="ts">
import { Skeleton as NutSkeleton } from '@nutui/nutui-taro';
</script>

<style lang="scss">
.user-info-loader {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
