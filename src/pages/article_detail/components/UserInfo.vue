<template>
  <UserInfo :url="props.url" :name="props.name" :level="props.level">
    <template v-slot:extra>
      <time-ago :time="props.createTime" />
    </template>
    <template v-slot:suffix>
      <MoreS class="more" @click="showMenu" />
    </template>
  </UserInfo>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { MoreS } from '@nutui/icons-vue-taro';
import { ref, watch } from 'vue';
import UserInfo from '~/components/user_info/UserInfo.vue';
import { UserServiceInstance } from '~/service/user_service';

const props = defineProps<{
  url: string;
  name: string;
  level: number;
  createTime: string;
  authorId: number;
  initialFollowed?: boolean;
}>();

const isFlowing = ref(false);
watch(
  () => props.initialFollowed,
  (initialFollowed) => {
    isFlowing.value = initialFollowed ?? false;
  }
);

const emit = defineEmits<{ (event: 'report'): Promise<void> }>();
// 点击更多按钮展示关注和举报菜单栏
const showMenu = () => {
  Taro.showActionSheet({
    itemList: [isFlowing?.value ? '取消关注' : '关注', '举报'],
    async success(res) {
      if (res.tapIndex === 0) {
        if (isFlowing.value) {
          await UserServiceInstance.cancelFollowUser(props.authorId);
        } else {
          await UserServiceInstance.followUser(props.authorId);
        }
        isFlowing.value = !isFlowing.value;
      } else {
        await emit('report');
        Taro.showToast({
          title: '举报成功',
          icon: 'success',
          duration: 1000,
        });
      }
    },
    fail() {},
  });
};
</script>

<style scoped></style>
