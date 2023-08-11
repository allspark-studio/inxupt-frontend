<template>
  <div class="wrapper">
    <div class="top-box">
      <div class="user-info">
        <ArticleUserInfo
          type="article"
          :name="postDetail.authorName"
          :avatar="postDetail.authorAvatar"
          :level="postDetail.authorLevel"
          :author-id="postDetail.authorId"
          :create-time="postDetail.createTime"
          :initial-followed="postDetail.followed"
          :report-func="() => reportArticle(postDetail.postId)"
        />
      </div>
      <nut-skeleton
        v-if="isArticleLoading"
        width="700rpx"
        height="15px"
        title
        animated
        row="3"
        round
      />
      <!-- <div class="content" v-html="postDetail.body"></div> -->
      <div class="action-bar">
        <IconState
          @on-change="
            (state) => {
              if (state) {
                ArticleServiceInstance.likeArticle(postDetail.postId);
              } else {
                ArticleServiceInstance.cancelLikeArticle(postDetail.postId);
              }
            }
          "
          :initial-click="postDetail.liked"
          :initial-sum="postDetail.likeNum"
          active-color="#FEDA48"
          normal-color="#333"
        >
          <Fabulous />
        </IconState>
        <IconState
          @on-change="
            (state) => {
              if (state) {
                ArticleServiceInstance.favoriteArticle(postDetail.postId);
              } else {
                ArticleServiceInstance.cancelFavoriteArticle(postDetail.postId);
              }
            }
          "
          :initial-click="postDetail.favorited"
          :initial-sum="postDetail.favoriteNum"
          active-color="#FEDA48"
          normal-color="#333"
        >
          <Star />
        </IconState>
        <IconState
          @on-change="
            (state) => {
              if (state) {
                // ArticleServiceInstance.favoriteArticle(data.postId);
              } else {
                // ArticleServiceInstance.cancelFavoriteArticle(data.postId);
              }
            }
          "
          :initial-click="false"
          :initial-sum="0"
          active-color="#FEDA48"
          normal-color="#333"
        >
          <ShareN />
        </IconState>
      </div>
    </div>
    <div class="comments-box">
      <div class="title-box">
        <h3 class="title">评论 {{ postDetail.commentNum }}</h3>
        <Switches active-text="时间" inactive-text="热度" @change="switchCommentType" />
      </div>
      <div class="comment" v-for="(comment, index) in comments" :key="comment.commentId">
        <!-- <ArticleUserInfo
          type="comment"
          :avatar="comment.authorAvatar"
          :name="comment.authorNickname"
          :level="comment.authorLevel"
          :author-id="comment.authorId"
          :create-time="comment.createTime"
          :report-func="() => reportComment(comment.commentId)"
        /> -->
        <!-- :initial-followed="comment" -->
        <TalkItem
          :post-id="id!"
          :comment="comment"
          :origin="Origin.Article"
          @get-comments="getComments"
        />
        <div class="comment-box">
          <div class="comment-reply" v-if="comment.subComments.length">
            <div
              class="comment-reply-item"
              v-for="reply in comment.subComments"
              :key="reply.commentId"
              @click="() => handleShowComment(index)"
            >
              <template v-if="reply.replyUserId !== comment.authorId">
                <UserName :username="reply.authorNickname" :user-id="reply.authorId" />
                回复
                <UserName :username="'@' + reply.replyUserNickname" :user-id="reply.replyUserId" />
              </template>
              <UserName v-else :username="reply.authorNickname" :user-id="reply.authorId" />
              :
              {{ reply.text }}
            </div>
          </div>
        </div>
        <nut-divider v-if="index !== comments.length - 1" style="color: #fafafa" />
      </div>
    </div>
    <div class="comment-bottom">再怎么找也没有了</div>
    <div class="comment-input-button-box">
      <input
        disabled
        class="comment-input-button"
        placeholder="发一条友善的小评论吧~"
        @click="handleShowCommentBox"
      />
    </div>
    <CommentBox
      :origin="Origin.Article"
      :post-id="id!"
      :root-id="0"
      :parent-id="0"
      :reply-user-id="postDetail.authorId"
      ref="commentRef"
      @get-comments="getComments"
    />
  </div>
  <NutPopup
    position="bottom"
    closeable
    round
    :style="{ height: '70%', overflow: 'none' }"
    v-model:visible="data.isShowComment"
  >
    <div class="comment-detail-title">
      {{ `${comments[data.showCommentIndex]?.subComments.length}条回复` }}
    </div>
    <div :style="{ height: 'calc(100% - 120rpx)', overflowY: 'scroll' }">
      <div class="comment-detail-content">
        <TalkItem
          :post-id="id!"
          :comment="comments[data.showCommentIndex]"
          :origin="Origin.Article"
          @get-comments="getComments"
        />
      </div>
      <div class="comment-reply-box">
        <div
          v-for="subComment in comments[data.showCommentIndex]?.subComments"
          :key="subComment.commentId"
        >
          <TalkItem
            :post-id="id!"
            :comment="(subComment as any)"
            :origin="Origin.Comment"
            @get-comments="getComments"
            :root-comment-author-id="comments[data.showCommentIndex].authorId"
          />
        </div>
      </div>
    </div>
  </NutPopup>
</template>
<script setup lang="ts">
import { computed, watchEffect, reactive, ref } from 'vue';
import Taro from '@tarojs/taro';
import { useAsyncState } from '@vueuse/core';
import {
  Skeleton as NutSkeleton,
  Divider as NutDivider,
  Popup as NutPopup,
} from '@nutui/nutui-taro';
import { Fabulous, Star, ShareN } from '@nutui/icons-vue-taro';
import { useRouteParam } from '~/utils/hooks';
import { PostServiceInstance, IPostDetail } from '~/service/post_service';
import Switches from '~/components/Switches.vue';
import IconState from '~/components/IconState.vue';
import ArticleUserInfo from './components/ArticleUserInfo.vue';
import { ArticleServiceInstance } from '~/service/article_service';
import { CommentServiceInstance, IComment } from '~/service/comment_service';
import UserName from './components/UserName.vue';
import TalkItem from './components/TalkItem.vue';
import { Origin } from './const';
import CommentBox from './components/CommentBox.vue';

const { reportArticle } = ArticleServiceInstance;
const { id } = useRouteParam();
const {
  state,
  isLoading: isArticleLoading,
  execute,
} = useAsyncState(PostServiceInstance.getPostDetail, {} as any, {
  immediate: false,
});
const commentRef = ref();
// const isShowComment = reactive({});
const postDetail = computed<IPostDetail>(() => state.value.data ?? {});
const type = ref<'new' | 'hot'>('new');
const { state: commentsResponse, execute: getComments } = useAsyncState(
  async () => {
    Taro.showLoading({
      title: '加载中',
    });
    const res = await CommentServiceInstance.getPostAllComments(id!, type.value);
    Taro.hideLoading();
    return res;
  },
  {} as any,
  {
    immediate: false,
    resetOnExecute: false,
  }
);
const comments = computed<IComment[]>(() => commentsResponse.value.data ?? []);

const switchCommentType = (e: boolean) => {
  if (e) {
    type.value = 'new';
  } else {
    type.value = 'hot';
  }
};
const data = reactive({
  isShowComment: false,
  showCommentIndex: 0,
  isShowCommentInput: true,
  inputCommentId: 0,
});
const handleShowComment = (index: number) => {
  data.isShowComment = true;
  data.showCommentIndex = index;
};
const handleShowCommentBox = () => {
  commentRef.value?.showCommentBox();
};

watchEffect(() => {
  if (typeof id === 'undefined') return;
  execute(0, id);
});
watchEffect(() => {
  getComments();
});
</script>
<style lang="scss" module>
$bgColor: #e6eaed;
.wrapper {
  background-color: $bgColor;
  padding-top: 16rpx;
  height: 100vh;
}

.top-box {
  background-color: #fff;
  padding: 0 24rpx;
}
.action-bar {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16rpx;
}
.comments-box {
  background-color: #fff;
  margin: 16rpx 0;
  padding: 16rpx 24rpx;
}
.title-box {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 28rpx;
  margin-bottom: 16rpx;
  font-weight: 500;
  letter-spacing: 8rpx;
}

.comment-reply {
  margin-top: 24rpx;
  background-color: #efefef;
  padding: 8rpx 12rpx;
}
.comment-detail-title {
  font-size: 32rpx;
  font-weight: 400;
  height: 60rpx;
  margin-top: 24rpx;
  letter-spacing: 8rpx;
  margin-bottom: 16rpx;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.comment-detail-content {
  padding-bottom: 24rpx;
  border-bottom: 16rpx solid #efefef;
}
.comment-reply-box {
  margin-top: 24rpx;
}
.comment-input {
  max-height: 300rpx;
  min-height: 150rpx;
  background-color: #efefef;
}
.comment-input-wrapper {
  background-color: #efefef;
  border-radius: 16rpx;
  overflow: hidden;
  margin: 48rpx 24rpx 8rpx 24rpx;
}
.comment-input-wrapper .nut-textarea {
  background-color: #efefef;
}
.comment-input-bar {
  display: flex;
  justify-content: space-between;
  margin: 16rpx 16rpx 32rpx 16rpx;
}
.comment-input-button-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f4f1f1;
  height: 120rpx;
}
.comment-input-button {
  background-color: #e2e0e0;
  height: 44rpx;
  border-radius: 999rpx;
  padding-left: 2em;
  margin: 32rpx 24rpx;
}
.comment-bottom {
  padding-bottom: 144rpx;
  text-align: center;
  color: #999;
}
/* .reply-comment-content */
</style>
