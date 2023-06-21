<template>
  <div>
    <UserInfo
      :name="props.item.authorName"
      :url="props.item.authorAvatar"
      :level="props.item.authorLevel"
    >
      <template v-slot:extra>
        <time-ago :time="props.item.createTime"></time-ago>
      </template>
      <template v-slot:suffix>
        <MoreS class="more" />
      </template>
    </UserInfo>
    <div class="content" v-html="props.item.body"></div>
    <ul class="interactive">
      <li @click="switchFabulousColor">
        <Fabulous :color="state.FabulousColor" />
        <span>{{ state.likeNum }}</span>
      </li>
      <li @click="switchStarColor">
        <Star :color="state.StarColor" />
        <span>{{ state.favoriteNum }}</span>
      </li>
      <li>
        <Message />
        <span>{{ props.item.commentNum }}</span>
      </li>
      <li>
        <ShareN />
        <span>{{ props.item.coinsNum }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import Taro from '@tarojs/taro';
import { reactive, onMounted } from 'vue';
import { MoreS, Fabulous, Star, Message, ShareN } from '@nutui/icons-vue-taro';
import UserInfo from '~/components/user_info/UserInfo.vue';
import TimeAgo from '~/components/TimeAgo.vue';
import PostService from '~/service/post_service';
import { PostInfoFacade } from '~/types/person_types';

const postService = new PostService();
const props = defineProps<{ item: PostInfoFacade }>();

const state = reactive({
  StarColor: '',
  FabulousColor: '',
  likeNum: 0,
  favoriteNum: 0,
});
const init = () => {
  state.likeNum = props.item.likeNum;
  state.favoriteNum = props.item.favoriteNum;
  state.FabulousColor = props.item.liked ? '#FEDA48' : '';
  state.StarColor = props.item.favorited ? '#FEDA48' : '';
};

onMounted(() => {
  init();
});

const postLike = async () => {
  try {
    await postService.likeArticle(props.item.postId);
    state.FabulousColor = '#FEDA48';
    state.likeNum += 1;
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};

const postFavorite = async () => {
  try {
    await postService.favoriteArticle(props.item.postId);
    state.StarColor = '#FEDA48';
    state.favoriteNum += 1;
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
const postCancelFavorite = async () => {
  try {
    await postService.favoriteArticle(props.item.postId);
    state.StarColor = '';
    state.favoriteNum -= 1;
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
const postCancelLike = async () => {
  try {
    await postService.cancelLikeArticle(props.item.postId);
    state.FabulousColor = '';
    state.likeNum -= 1;
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
const switchFabulousColor = () => {
  if (!state.FabulousColor) {
    postLike();
  } else {
    postCancelLike();
  }
};
const switchStarColor = () => {
  if (!state.StarColor) {
    postFavorite();
  } else {
    postCancelFavorite();
  }
};
</script>
