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
  <div class="comment-box">
    <p class="comment-content">
      <template v-if="origin !== Origin.Article && comment?.replyUserId !== rootCommentAuthorId">
        回复
        <UserName :user-id="comment?.replyUserId!" :username="'@'+comment?.replyUserNickname!" />
        :
      </template>
      {{ comment.text }}
    </p>
    <ImgList :images="comment.mediaUrls" mode="preview" />
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
        @click="() => showCommentInput(comment.commentId)"
        :initial-sum="comment?.subComments?.length ?? 0"
        normal-color="#333"
      >
        <Message />
      </IconSum>
    </div>
  </div>
  <CommentBox
    :origin="Origin.Comment"
    :root-id="comment.rootId === 0 ? comment.commentId : comment.rootId"
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
import UserName from './UserName.vue';
import ImgList from './ImgList.vue';

const { reportComment } = CommentServiceInstance;
defineProps<{
  comment: Partial<IComment & IComment['subComments'][number]> &
    (IComment | IComment['subComments'][number]);
  origin: Origin;
  postId: string;
  rootCommentAuthorId?: number;
}>();

const commentBox = ref();
const showCommentInput = (id: number) => {
  commentBox.value.showCommentBox(id);
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
.comment-content {
  margin-bottom: 24rpx;
}
</style>
