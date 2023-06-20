<template>
  <basic-layout>
    <othersView v-if="judgeShow" :id="currentParams"></othersView>
    <personView v-if="!judgeShow" :id="userId"></personView>
  </basic-layout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Taro from '@tarojs/taro';
import { computed } from 'vue';
import BasicLayout from '~/layout/BasicLayout.vue';
import personView from '~/pages/profile/personView.vue';
import othersView from '~/pages/profile/OthersView.vue';
import { useUserStore } from '../../store/user_store';
import { onLoginMounted } from '~/mixins/login_mounted';

const userService = useUserStore();
const currentParams = Taro.getCurrentInstance().router?.Id;
const { userId, userInfo } = storeToRefs(userService);
onLoginMounted(async () => {
  console.log(userId.value);
  console.log(userInfo.value);
});

const judgeShow = computed(() => {
  if (userId.value === currentParams) {
    return true;
  }
  return false;
});
</script>
