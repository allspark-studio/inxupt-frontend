<template>
  <user-info
    :url="state.userData.avatarUrl"
    :level="state.userData.level"
    :name="state.userData.nickname"
  >
    <template v-slot:extra>
      <div class="extra">
        <span>动态：{{ state.userData.newsNum }}</span>
        <span>粉丝：{{ state.userData.followNum }}</span>
      </div>
    </template>
    <template v-slot:suffix>
      <nut-tag :color="state.bgColor" style="width: 50px" @click="switchState" class="suffix_tag">
        {{ state.attention }}
      </nut-tag>
    </template>
  </user-info>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { Tag as NutTag } from '@nutui/nutui-taro';
import Taro from '@tarojs/taro';
import UserInfo from '~/components/user_info/UserInfo.vue';
import OthersViewService from '~/service/othersView_service';
import PostService from '~/service/post_service';

const props = defineProps<{
  item: {
    id: number;
    nickName: string;
    avatarUrl: string;
    accountAuth: string[];
    description: string;
    followed: boolean;
    level: Number | null;
  };
}>();
const state = reactive({
  bgColor: '#FEDA48',
  attention: '关注',
  userData: {
    accountAuth: [''],
    articleNum: 0,
    avatarUrl: '',
    backgroundUrl: '',
    description: '',
    fansNum: 0,
    followNum: 0,
    followed: true,
    gender: 0,
    grade: '',
    hisId: 0,
    level: 0,
    likedNum: 0,
    major: '',
    newsNum: 0,
    nickname: '',
  },
});
const othersViewService = new OthersViewService();
const fetchUser = async () => {
  try {
    const { data } = await othersViewService.getUserInfo(props.item.id);
    state.userData = data;
    state.bgColor = data.followed ? 'gainsboro' : '#FEDA48';
    state.attention = data.followed ? '已关注' : '关注';
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
onMounted(() => {
  fetchUser();
});

const postService = new PostService();
const followUser = async () => {
  try {
    await postService.followUser(props.item.id);
    state.bgColor = 'gainsboro';
    state.attention = '已关注';
    state.userData.followed = true;
  } catch (e) {
    Taro.showToast({
      title: e.msg,
      icon: 'error',
      duration: 1000,
    });
  }
};
const unFollowUser = async () => {
  try {
    await postService.followUser(props.item.id);
    state.bgColor = '#FEDA48';
    state.attention = '关注';
    state.userData.followed = false;
  } catch (e) {
    Taro.showToast({
      title: e.msg,
      icon: 'error',
      duration: 1000,
    });
  }
};

const switchState = () => {
  if (state.userData.followed) {
    unFollowUser();
  } else {
    followUser();
  }
};
</script>

<style lang="scss">
.extra {
  display: flex;
  span {
    color: rgb(126, 126, 126);
    font-size: 26px;
    margin: 3px 15px 0 5px;
  }
}
.suffix_tag {
  --nut-tag-default-color: black;
  display: flex;
  align-items: center;
  width: 60px;
  justify-content: center;
  font-size: 26px;
}
</style>
