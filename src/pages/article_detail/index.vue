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
        <ArticleUserInfo
          type="comment"
          :avatar="comment.authorAvatar"
          :name="comment.authorNickname"
          :level="comment.authorLevel"
          :author-id="comment.authorId"
          :create-time="comment.createTime"
          :report-func="() => reportComment(comment.commentId)"
        />
        <!-- :initial-followed="comment" -->
        <div class="comment-box">
          <p class="comment-content">
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
            <IconSum :initial-sum="comment.subComments.length" normal-color="#333">
              <Message />
            </IconSum>
          </div>
          <div class="comment-reply" v-if="comment.subComments.length">
            <div
              class="comment-reply-item"
              v-for="(reply, index) in comment.subComments"
              :key="reply.commentId"
              @click="() => handleShowComment(index)"
            >
              <ReplyUserName
                :username="reply.authorNickname"
                :user-id="reply.authorId"
                :reply-user-id="reply.replyUserId"
                :reply-username="reply.replyUserNickname"
                v-if="reply.replyUserId"
              />
              <UserName v-else :username="reply.authorNickname" :user-id="reply.authorId" />
              :
              {{ reply.text }}
            </div>
          </div>
        </div>
        <nut-divider v-if="index !== comments.length - 1" style="color: #fafafa" />
      </div>
    </div>
  </div>
  <NutPopup
    position="bottom"
    closeable
    round
    :style="{ height: '70%' }"
    v-model:visible="data.isShowComment"
  >
    <div class="comment-detail-title">
      {{ `${comments[data.showCommentIndex]?.subComments.length}条回复` }}
    </div>
    <div>
      <div class="comment-detail-content">
        <ArticleUserInfo
          :avatar="comments[data.showCommentIndex]?.authorAvatar"
          :name="comments[data.showCommentIndex]?.authorNickname"
          :level="comments[data.showCommentIndex]?.authorLevel"
          :author-id="comments[data.showCommentIndex]?.authorId"
          :create-time="comments[data.showCommentIndex]?.createTime"
          :initial-followed="false"
          :report-func="() => reportComment(comments[data.showCommentIndex]?.commentId)"
        />
        <div class="comment-box">
          <p>
            {{ comments[data.showCommentIndex]?.text }}
          </p>
          <div class="comment-action-bar">
            <IconState
              @on-change="
                (state) => {
                  if (state) {
                    CommentServiceInstance.likeComment(comments[data.showCommentIndex].commentId);
                  } else {
                    CommentServiceInstance.unlikeComment(comments[data.showCommentIndex].commentId);
                  }
                }
              "
              :initial-click="comments[data.showCommentIndex].liked"
              :initial-sum="comments[data.showCommentIndex].likeNum"
              active-color="#FEDA48"
              normal-color="#333"
            >
              <Fabulous />
            </IconState>
            <IconSum
              :initial-sum="comments[data.showCommentIndex].subComments.length"
              normal-color="#333"
            >
              <Message />
            </IconSum>
          </div>
        </div>
      </div>
      <div class="comment-reply-box">
        <div
          v-for="subComment in comments[data.showCommentIndex]?.subComments"
          :key="subComment.commentId"
        >
          <!-- todo 缺少一个follow -->
          <ArticleUserInfo
            :avatar="subComment.authorAvatar"
            :name="subComment.authorNickname"
            :level="subComment.authorLevel"
            :author-id="subComment.authorId"
            :create-time="subComment.createTime"
            :initial-followed="false"
            :report-func="() => reportComment(subComment.commentId)"
          />
          <div class="comment-box">
            <p>
              {{ subComment.text }}
            </p>
            <div class="comment-action-bar">
              <IconState
                @on-change="
                  (state) => {
                    if (state) {
                      CommentServiceInstance.likeComment(subComment.commentId);
                    } else {
                      CommentServiceInstance.unlikeComment(subComment.commentId);
                    }
                  }
                "
                :initial-click="subComment.liked"
                :initial-sum="subComment.likeNum"
                active-color="#FEDA48"
                normal-color="#333"
              >
                <Fabulous />
              </IconState>
            </div>
            <!-- <IconSum :initial-sum="subComment.length" normal-color="#333">
              <Message />
            </IconSum> -->
          </div>
        </div>
      </div>
    </div>
  </NutPopup>
</template>
<script setup lang="ts">
import { computed, watchEffect, reactive } from 'vue';
import { useAsyncState } from '@vueuse/core';
import {
  Skeleton as NutSkeleton,
  Divider as NutDivider,
  Popup as NutPopup,
} from '@nutui/nutui-taro';
import { Fabulous, Star, ShareN, Message } from '@nutui/icons-vue-taro';
import { useRouteParam } from '~/utils/hooks';
import { PostServiceInstance, IPostDetail } from '~/service/post_service';
import Switches from '~/components/Switches.vue';
import IconState from '~/components/IconState.vue';
import ArticleUserInfo from './components/ArticleUserInfo.vue';
import { ArticleServiceInstance } from '~/service/article_service';
import { CommentServiceInstance, IComment } from '~/service/comment_service';
import IconSum from '~/components/IconSum.vue';
import UserName from './components/UserName.vue';
import ReplyUserName from './components/ReplyUserName.vue';

const { reportComment } = CommentServiceInstance;
const { reportArticle } = ArticleServiceInstance;
const { id } = useRouteParam();
const {
  state,
  isLoading: isArticleLoading,
  execute,
} = useAsyncState(PostServiceInstance.getPostDetail, {} as any, {
  immediate: false,
});
// const isShowComment = reactive({});
const postDetail = computed<IPostDetail>(() => state.value.data ?? {});
const { state: commentsResponse, execute: getComments } = useAsyncState(
  CommentServiceInstance.getPostAllComments,
  {} as any,
  {
    immediate: false,
  }
);
const comments = computed<IComment[]>(() => commentsResponse.value.data ?? []);

// todo 优化切换效果

const switchCommentType = (e: boolean) => {
  if (e) {
    getComments(0, id!, 'new');
  } else {
    getComments(0, id!, 'hot');
  }
};
const data = reactive({
  isShowComment: true,
  showCommentIndex: 0,
});
const handleShowComment = (index: number) => {
  data.isShowComment = true;
  data.showCommentIndex = index;
};

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
  margin-top: 24rpx;
}
.comment {
  margin: 16rpx 0;
}
.comment-box {
  margin-left: 106rpx;
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
/* .reply-comment-content */
</style>
