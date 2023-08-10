<template>
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
      <IconSum
        v-if="origin === Origin.Article"
        @click="() => showCommentInput()"
        :initial-sum="comment?.subComments?.length"
        normal-color="#333"
      >
        <Message />
      </IconSum>
    </div>
  </div>
  <CommentBox
    :origin="Origin.Comment"
    :root-id="comment.commentId"
    :post-id="postId"
    :parent-id="comment.commentId"
    :reply-user-id="comment.authorId"
    ref="commentBox"
    @get-comments="refresh"
  />
</template>

<script setup lang="ts">
import { Fabulous, Message } from '@nutui/icons-vue-taro';
import { ref } from 'vue';
import ArticleUserInfo from './ArticleUserInfo.vue';
import IconState from '~/components/IconState.vue';
import IconSum from '~/components/IconSum.vue';
import { CommentServiceInstance, IComment } from '~/service/comment_service';
import { Origin } from '../const';
import CommentBox from './CommentBox.vue';

const { reportComment } = CommentServiceInstance;
const props = defineProps<{
  comment: IComment;
  origin: Origin;
  postId: string;
}>();
const commentBox = ref();
const showCommentInput = () => {
  commentBox.value.showCommentBox(props.comment.commentId);
};
const emit = defineEmits(['getComments']);
const refresh = () => {
  emit('getComments');
};
</script>

<style lang="scss" module>
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
</style>
