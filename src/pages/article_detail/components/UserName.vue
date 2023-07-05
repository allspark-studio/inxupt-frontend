<template>
  <Text @click="onClick" class="reply-username">{{ props.username }}</Text>
</template>

<script setup lang="ts">
import { Text } from '@tarojs/components';
import Taro from '@tarojs/taro';

const props = defineProps<{
  username: string;
  userId: number;
}>();

const onClick = () => {
  Taro.navigateTo({
    // todo finfish user page
    url: `/pages/user/user?userId=${props.userId}`,
  });
};
</script>

<style>
.reply-username {
  color: #00f;
}
</style>
