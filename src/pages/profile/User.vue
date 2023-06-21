<template>
  <basic-layout>
    <others-view v-if="judgeShow" :id="currentParams"></others-view>
    <person-view v-if="!judgeShow" :id="userId"></person-view>
  </basic-layout>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import Taro from '@tarojs/taro';
import { computed } from 'vue';
import BasicLayout from '~/layout/BasicLayout.vue';
import PersonView from '~/pages/profile/PersonView.vue';
import OthersView from '~/pages/profile/OthersView.vue';
import { useUserStore } from '~/store/user_store';
import { onLoginMounted } from '~/mixins/login_mounted';

const userService = useUserStore();
const currentParams = Taro.getCurrentInstance().router?.Id;
const { userId } = storeToRefs(userService);
onLoginMounted(async () => {});

const judgeShow = computed(() => {
  if (userId.value === currentParams) {
    return true;
  }
  return false;
});
</script>
