<template>
  <div>
    <div class="timeline">
      <div class="timeline-left">
        <div class="timeline-card-title">
          <PostTime :time="props.item.createTime"></PostTime>
        </div>
        <div class="timeline-left-line"></div>
      </div>
      <div class="timeline-card">
        <div class="timeline-card-content">
          <nut-ellipsis
            class="content"
            :content="props.item.body"
            direction="end"
            rows="3"
            expandText="全文"
            collapseText="收起"
          ></nut-ellipsis>
        </div>
      </div>
      <div class="timeline-data">
        <ul class="timeline-data-interactive">
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
            <span>{{ state.postData.commentNum }}</span>
          </li>
          <li>
            <ShareN />
            <span>{{ state.postData.coinsNum }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { defineProps, reactive, onMounted } from 'vue';
import { Ellipsis as NutEllipsis } from '@nutui/nutui-taro';
import { Fabulous, Message, ShareN, Star } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';
import PostTime from './PostTime.vue';
import OthersViewService from '~/service/othersView_service';
import PostService from '~/service/post_service';

const postService = new PostService();
const othersViewService = new OthersViewService();
const props = defineProps({
  item: {
    postId: Number,
    type: Number,
    top: Boolean,
    title: null,
    pureText: null,
    cover: null,
    body: String,
    mediaUrls: null,
    ats: null,
    authorId: Number,
    authorName: String,
    authorAvatar: String,
    authorLevel: Number,
    accountAuth: [''],
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
  msg: 'toast',
  type: 'text',
  show: false,
  cover: false,
  title: '',
  bottom: '',
  center: true,
  postData: {
    accountAuth: [''],
    ats: [
      {
        additionalProp1: {},
      },
    ],
    authorAvatar: '',
    authorDescription: '',
    authorId: 0,
    authorLevel: 0,
    authorName: '',
    body: '',
    coined: true,
    coinsNum: 0,
    commentNum: 0,
    cover: '',
    createTime: '',
    favoriteNum: 0,
    favorited: true,
    likeNum: 0,
    liked: true,
    mediaUrls: [''],
    postId: 0,
    pureText: '',
    tags: [
      {
        additionalProp1: '',
      },
    ],
    title: '',
    top: true,
    type: 0,
  },
});
const getData = async () => {
  try {
    const { data } = await othersViewService.getPost(props.item.postId);
    state.postData = data;
    state.FabulousColor = state.postData.liked ? '#FEDA48' : '';
    state.StarColor = state.postData.favorited ? '#FEDA48' : '';
    state.likeNum = state.postData.likeNum;
    state.favoriteNum = state.postData.favoriteNum;
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getData();
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

<style lang="scss">
.timeline {
  position: relative;
  margin-top: 40px;
  padding-left: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  &-left {
    margin-right: 5px;
    &-line {
      width: 10px;
      position: absolute;
      top: 35px;
      left: 75px;
      height: 100%;
      padding: 3px;
      border-left: 1px solid rgb(182, 182, 186);
    }
  }
  &-card {
    height: 100%;
    &-title {
      width: 160px;
      text-align: center;
      position: absolute;
      left: 0px;
      font-size: 25px;
      color: rgb(0, 0, 0);
      margin-bottom: 10px;
      color: rgb(172, 172, 172);
    }
    &-content {
      line-height: 40px;
      padding: 0px 20px 20px 105px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
  }
  &-data {
    display: block;
    width: 100%;
    &-interactive {
      padding-left: 103px;
      display: flex;
      justify-content: space-around;
    }
  }
}
.timeline-data-interactive li {
  display: flex;
}
.timeline-data-interactive span {
  margin-left: 5px;
  margin-top: 3px;
}
.content {
  line-height: 46px;
  padding-left: 50px;
}
</style>
