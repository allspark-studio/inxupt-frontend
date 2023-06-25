<template>
  <div class="wrapper">
    <div class="top-box">
      <div class="user-info">
        <UserInfo
          :name="data.authorName"
          :url="data.authorAvatar"
          :level="data.authorLevel"
          :author-id="data.authorId"
          :create-time="data.createTime"
          :initial-followed="data.followed"
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
      <!-- <div class="content" v-html="data.body"></div> -->
      <div class="action-bar">
        <IconState
          @on-change="
            (state) => {
              if (state) {
                ArticleServiceInstance.likeArticle(data.postId);
              } else {
                ArticleServiceInstance.cancelLikeArticle(data.postId);
              }
            }
          "
          :initial-click="data.liked"
          :initial-sum="data.likeNum"
          active-color="#FEDA48"
          normal-color="#333"
        >
          <Fabulous />
        </IconState>
        <IconState
          @on-change="
            (state) => {
              if (state) {
                ArticleServiceInstance.favoriteArticle(data.postId);
              } else {
                ArticleServiceInstance.cancelFavoriteArticle(data.postId);
              }
            }
          "
          :initial-click="data.favorited"
          :initial-sum="data.favoriteNum"
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
        <h3 class="title">评论 {{ data.commentNum }}</h3>
        <Switches active-text="时间" inactive-text="热度" />
      </div>
      <div class="comment" v-for="(comment, index) in comments" :key="comment.commentId">
        <UserInfo
          :url="comment.authorAvatar"
          :name="comment.authorNickname"
          :level="comment.authorLevel"
          :author-id="comment.authorId"
          :create-time="comment.createTime"
        />
        <!-- :initial-followed="comment" -->
        <p>
          {{ comment.text }}
        </p>
        <div class="comment-action-bar">
          <IconState
            @on-change="
              (state) => {
                if (state) {
                  CommentServiceInstance.likeComment(comment.commentId);
                } else {
                  CommentServiceInstance.unlikeComment(comment.commentId);
                }
              }
            "
            :initial-click="comment.liked"
            :initial-sum="comment.likeNum"
            active-color="#FEDA48"
            normal-color="#333"
          >
            <Fabulous />
          </IconState>
          <IconState
            @on-change="
              () => {
                /*
                if (state) {
                  CommentServiceInstance.favoriteArticle(data.postId);
                } else {
                  ArticleServiceInstance.cancelFavoriteArticle(data.postId);
                }
                */
              }
            "
            :initial-sum="comment.subComments.length"
            active-color="#FEDA48"
            normal-color="#333"
          >
            <Message />
          </IconState>
        </div>
        <nut-divider v-if="index !== comments.length - 1" style="color: #fafafa" />
      </div>
    </div>
  </div>
</template>
// todo 后端follow有问题
<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { Skeleton as NutSkeleton, Divider as NutDivider } from '@nutui/nutui-taro';
import { Fabulous, Star, ShareN, Message } from '@nutui/icons-vue-taro';
import { useRouteParam } from '~/utils/hooks';
import { PostServiceInstance, IPostDetail } from '~/service/post_service';
import UserInfo from './components/UserInfo.vue';
import IconState from '~/components/IconState.vue';
import { ArticleServiceInstance } from '~/service/article_service';
import { CommentServiceInstance, IComment } from '~/service/comment_service';
import Switches from '~/components/Switches.vue';

const { id } = useRouteParam();
const {
  state,
  isLoading: isArticleLoading,
  execute,
} = useAsyncState(PostServiceInstance.getPostDetail, {} as any, {
  immediate: false,
});
const data = computed<IPostDetail>(() => state.value.data ?? {});
const { state: commentsResponse, execute: getComments } = useAsyncState(
  CommentServiceInstance.getPostAllComments,
  {} as any,
  {
    immediate: false,
  }
);
const comments = computed<IComment[]>(() => commentsResponse.value.data ?? []);

watchEffect(() => {
  if (typeof id === 'undefined') return;
  execute(0, id);
  getComments(0, id);
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

.comment-action-bar {
  display: flex;
  width: 160rpx;
  justify-content: space-between;
  margin-top: 8rpx;
}
.comment {
  margin: 16rpx 0;
}
</style>
