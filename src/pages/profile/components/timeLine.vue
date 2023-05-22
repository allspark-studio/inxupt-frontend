<template>
  <div>
    <div class="timeline">
      <div class="timeline-left">
        <div class="timeline-card-title">
          <time-ago :time="props.item.createTime"></time-ago>
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
            <Fabulous :color="FabulousColor" />
            <span>{{ props.item.likeNum }}</span>
          </li>
          <li>
            <Message />
            <span>{{ props.item.commentNum }}</span>
          </li>
          <li>
            <ShareN />
            <span>{{ props.item.favoriteNum }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { Ellipsis as NutEllipsis } from '@nutui/nutui-taro';
import { Fabulous, Message, ShareN } from '@nutui/icons-vue-taro';
import TimeAgo from '~/components/TimeAgo.vue';

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
const FabulousColor = ref('');
const switchFabulousColor = () => {
  if (!FabulousColor.value) {
    FabulousColor.value = '#FEDA48';
  } else {
    FabulousColor.value = '';
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
      left: 64px;
      height: 100%;
      padding: 3px;
      border-left: 1px solid rgb(182, 182, 186);
    }
  }
  &-card {
    height: 100%;
    &-title {
      width: 150px;
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
      padding-left: 65px;
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
  padding-left: 22px;
}
</style>
