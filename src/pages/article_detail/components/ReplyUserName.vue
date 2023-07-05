<template>
  <UserName :username="props.username" :user-id="props.userId" />
  <Text class="comment-reply-at">@</Text>
  <UserName :username="props.replyUsername" :user-id="props.replyUserId" />
</template>

<script setup lang="ts">
import { Text } from '@tarojs/components';
import UserName from './UserName.vue';

const props = defineProps<{
  username: string;
  userId: number;
  replyUserId: number;
  replyUsername: string;
}>();
</script>

<style>
.comment-reply-at {
  margin: 0 5px;
  color: #00f;
}
</style>
