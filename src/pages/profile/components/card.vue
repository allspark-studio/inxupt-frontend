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
        <Fabulous :color="FabulousColor" />
        <span>{{ props.item.likeNum }}</span>
      </li>
      <li @click="switchStarColor">
        <Star :color="StarColor" />
        <span>{{ props.item.favoriteNum }}</span>
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
import { ref } from 'vue';
import { MoreS, Fabulous, Star, Message, ShareN } from '@nutui/icons-vue-taro';
import UserInfo from '~/components/user_info/UserInfo.vue';
import TimeAgo from '~/components/TimeAgo.vue';

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

const FabulousColor = ref('');
const StarColor = ref('');
const switchFabulousColor = () => {
  if (!FabulousColor.value) {
    FabulousColor.value = '#FEDA48';
  } else {
    FabulousColor.value = '';
  }
};
const switchStarColor = () => {
  if (!StarColor.value) {
    StarColor.value = '#FEDA48';
  } else {
    StarColor.value = '';
  }
};
</script>
