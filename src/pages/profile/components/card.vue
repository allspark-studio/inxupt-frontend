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
        <Star :color="StarColor" />
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
<script setup>
import { reactive, onMounted } from 'vue';
import { MoreS, Fabulous, Star, Message, ShareN } from '@nutui/icons-vue-taro';
import UserInfo from '~/components/user_info/UserInfo.vue';
import TimeAgo from '~/components/TimeAgo.vue';
import OthersViewService from '~/service/othersView_service';

const othersViewService = new OthersViewService();
const props = defineProps({
  item: {
    postId: Number,
    type: Number,
    top: Boolean,
    title: String,
    pureText: String,
    body: String,
    mediaUrls: null,
    ats: null,
    authorId: 8,
    authorName: String,
    authorAvatar: String,
    authorLevel: Number,
    accountAuth: ['1'],
    authorDescription: String,
    createTime: String,
    tags: null,
    likeNum: Number,
    commentNum: Number,
    favoriteNum: Number,
    coinsNum: Number,
    liked: Boolean,
    favorited: Boolean,
    coined: Boolean,
  },
});
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
const switchFabulousColor = () => {
  if (!state.FabulousColor) {
    try {
      othersViewService.like(props.item.postId).then(
        () => {
          state.FabulousColor = '#FEDA48';
          state.likeNum += 1;
        },
        (error) => {
          Taro.showToast({
            title: error.msg,
            icon: 'none',
            duration: 2000,
          });
        }
      );
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      othersViewService.unlike(props.item.postId).then(() => {
        state.FabulousColor = '';
        state.likeNum -= 1;
      });
    } catch (error) {
      console.error(error);
    }
  }
};
const switchStarColor = () => {
  if (!state.StarColor) {
    try {
      othersViewService.favorite(props.item.postId).then(
        () => {
          state.StarColor = '#FEDA48';
          state.favoriteNum += 1;
        },
        (error) => {
          Taro.showToast({
            title: error.msg,
            icon: 'none',
            duration: 2000,
          });
        }
      );
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      othersViewService.unfavorite(props.item.postId).then(() => {
        state.StarColor = '';
        state.favoriteNum -= 1;
      });
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
