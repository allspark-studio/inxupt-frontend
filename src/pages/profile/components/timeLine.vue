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
          <li>
            <Message />
            <span>{{ postData.data.commentNum }}</span>
          </li>
          <li>
            <ShareN />
            <span>{{ postData.data.coinsNum }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue';
import { Ellipsis as NutEllipsis } from '@nutui/nutui-taro';
import { Fabulous, Message, ShareN } from '@nutui/icons-vue-taro';
import PostTime from './PostTime.vue';
import OthersViewService from '~/service/othersView_service';

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

const postData = {
  data: {
    accountAuth: ['string'],
    ats: [
      {
        additionalProp1: {},
      },
    ],
    authorAvatar: 'string',
    authorDescription: 'string',
    authorId: 0,
    authorLevel: 0,
    authorName: 'string',
    body: 'string',
    coined: true,
    coinsNum: 0,
    commentNum: 0,
    cover: 'string',
    createTime: 'string',
    likeNum: 0,
    liked: true,
    mediaUrls: ['string'],
    postId: 0,
    pureText: 'string',
    tags: [
      {
        additionalProp1: 'string',
      },
    ],
    title: 'string',
    top: true,
    type: 0,
  },
};

const state = reactive({
  StarColor: '',
  FabulousColor: '',
  likeNum: 0,
  favoriteNum: 0,
});

const getData = () => {
  try {
    othersViewService.getPost(props.item.postId).then((res) => {
      postData.data = res.data.data;
      state.FabulousColor = postData.data.liked ? '#FEDA48' : '';
      state.StarColor = postData.data.favorited ? '#FEDA48' : '';
      state.likeNum = postData.data.likeNum;
      state.favoriteNum = postData.data.favoriteNum;
    });
  } catch (error) {
    // console.error(error);
  }
};

getData();
const switchFabulousColor = () => {
  if (!state.FabulousColor) {
    try {
      othersViewService.like(props.item.postId).then(() => {
        state.FabulousColor = '#FEDA48';
        state.likeNum += 1;
      });
    } catch (error) {
      // console.error(error);
    }
  } else {
    try {
      othersViewService.unlike(props.item.postId).then(() => {
        state.FabulousColor = '';
        state.likeNum -= 1;
      });
    } catch (error) {
      // console.error(error);
    }
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
      font-size: 6px;
      position: absolute;
      left: 0px;
      font-size: 15px;
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
