<template>
  <view class="load-more">
    <view class="load-more__loading" v-if="!finished">
      <text>{{ loadingText }}</text>
      <loading></loading>
    </view>
    <text v-else>{{ finishedText }}</text>
  </view>
</template>

<script lang="ts" setup>
import { Loading } from '@nutui/icons-vue-taro';

defineProps({
  finished: {
    type: Boolean,
    default: false,
  },
  finishedText: {
    type: String,
    default: '没有更多啦！',
  },
  loadingText: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss">
.load-more {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 10px;
  text-align: center;
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
