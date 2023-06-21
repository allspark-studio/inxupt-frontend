<template>
  <basic-layout>
    <person-view :id="userId"></person-view>
  </basic-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import BasicLayout from '~/layout/BasicLayout.vue';
import PersonView from '~/pages/profile/PersonView.vue';
import { onLoginMounted } from '~/mixins/login_mounted';
import { useUserStore } from '~/store/user_store';

const userStore = useUserStore();
const { userId } = storeToRefs(userStore);
onLoginMounted(async () => {});
</script>
