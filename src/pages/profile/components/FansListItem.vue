<template>
  <user-info
    :url="userData.data.avatarUrl"
    :level="userData.data.level"
    :name="userData.data.nickname"
  >
    <template v-slot:extra>
      <div class="extra">
        <span>动态：{{ userData.data.newsNum }}</span>
        <span>粉丝：{{ userData.data.followNum }}</span>
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
import { reactive } from 'vue';
import { Tag as NutTag } from '@nutui/nutui-taro';
import UserInfo from '~/components/user_info/UserInfo.vue';
import OthersViewService from '~/service/othersView_service';

const props = defineProps<{
  item: {
    id: Number;
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
});

const userData = reactive({
  data: {
    accountAuth: ['string'],
    articleNum: 0,
    avatarUrl: 'string',
    backgroundUrl: 'string',
    description: 'string',
    fansNum: 0,
    followNum: 0,
    followed: true,
    gender: 0,
    grade: 'string',
    hisId: 0,
    level: 0,
    likedNum: 0,
    major: 'string',
    newsNum: 0,
    nickname: 'string',
  },
});

const othersViewService = new OthersViewService();
const getData = () => {
  try {
    othersViewService.getUserInfo(props.item.id).then((res) => {
      userData.data = res.data.data;
      state.attention = userData.data.followed ? '已关注' : '关注';
      state.bgColor = userData.data.followed ? 'gainsboro' : '#FEDA48';
    });
  } catch (error) {
    console.log(error);
  }
};
getData();
const switchState = () => {
  if (userData.data.followed) {
    othersViewService.unFollow(props.item.id).then(() => {
      state.attention = '关注';
      state.bgColor = '#FEDA48';
      userData.data.followed = false;
    });
  } else {
    othersViewService.follow(props.item.id).then(() => {
      state.attention = '已关注';
      state.bgColor = 'gainsboro';
      userData.data.followed = true;
    });
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
