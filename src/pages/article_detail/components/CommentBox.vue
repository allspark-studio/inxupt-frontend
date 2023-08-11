<template>
  <NutPopup position="bottom" round v-model:visible="data.isShowCommentInput">
    <div class="comment-input-wrapper">
      <NutTextarea
        class="comment-input"
        autosize
        max-length="150"
        limit-show
        v-model="data.userComment"
      />
    </div>
    <div class="comment-input-bar">
      <div></div>
      <NutButton class="comment-submit" size="small" @click="submitComment">说一嘴</NutButton>
    </div>
  </NutPopup>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Popup as NutPopup, Button as NutButton, Textarea as NutTextarea } from '@nutui/nutui-taro';
import { CommentServiceInstance } from '~/service/comment_service';
import { Origin } from '../const';

// const { reportComment } = CommentServiceInstance;
const props = defineProps<{
  origin: Origin;
  rootId: number;
  postId: string;
  parentId: number;
  replyUserId: number;
}>();
const data = reactive<{
  isShowCommentInput: boolean;
  userComment: string;
}>({
  isShowCommentInput: false,
  userComment: '',
});
const showCommentBox = () => {
  data.isShowCommentInput = true;
};
const emit = defineEmits(['getComments']);
const submitComment = () => {
  CommentServiceInstance.createCommentForPost(`${props.postId}`, {
    body: data.userComment,
    mediaUrls: [],
    rootId: props.rootId,
    parentId: props.parentId,
    replyUserId: props.replyUserId,
    privately: false,
  })
    .then(() => {
      emit('getComments');
      data.userComment = '';
    })
    .finally(() => {
      data.isShowCommentInput = false;
    });
  // console.log(data.userComment);
};
defineExpose({ showCommentBox });
// const comment = toRef(props, 'comment');
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
.comment-submit {
  background-color: #feda48;
  color: #333;
  border: none;
}
</style>
