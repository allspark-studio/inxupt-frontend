<template>
  <basic-layout>
    <others-view v-if="judgeShow && userIdFromQuery" :id="userIdFromQuery"></others-view>
    <person-view v-if="!judgeShow && userIdFromQuery" :id="userIdFromQuery"></person-view>
  </basic-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Taro from '@tarojs/taro';
import { computed } from 'vue';
import BasicLayout from '~/layout/BasicLayout.vue';
import PersonView from '~/pages/profile/PersonView.vue';
import OthersView from '~/pages/profile/OthersView.vue';
import { useUserStore } from '~/store/user_store';
import { onLoginMounted } from '~/mixins/login_mounted';

const userService = useUserStore();
const currentInstance = Taro.getCurrentInstance();
const userIdFromQuery = computed(() => {
  const numberId = Number(currentInstance.router?.params.id);
  if (Number.isNaN(numberId)) {
    return undefined;
  }
  return numberId;
});
const { userId } = storeToRefs(userService);
onLoginMounted(async () => {});

const judgeShow = computed(() => {
  if (userId.value === userIdFromQuery.value) {
    return true;
  }
  return false;
});
</script>
