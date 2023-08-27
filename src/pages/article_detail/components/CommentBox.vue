<template>
  <NutPopup position="bottom" round v-model:visible="data.isShowCommentInput">
    <div class="comment-input-wrapper">
      <NutTextarea
        class="comment-input"
        autosize
        autofocus
        max-length="150"
        limit-show
        v-model="data.userComment"
      />
      <ImgList
        :images="data.imgList"
        v-show="data.imgList.length > 0"
        @remove-item="
          (index) => {
            data.imgList.splice(index, 1);
          }
        "
      />
    </div>
    <div class="comment-input-bar">
      <div style="display: flex">
        <span style="margin-left: 24rpx" @click="() => (data.isPrivate = !data.isPrivate)">
          <Eye v-show="!data.isPrivate" />
          <Marshalling style="color: #feda48" v-show="data.isPrivate" />
        </span>
        <ImgIcon style="margin-left: 24rpx" @click="handleImgUpload" />
      </div>
      <NutButton class="comment-submit" size="small" @click="submitComment">说一嘴</NutButton>
    </div>
  </NutPopup>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Popup as NutPopup, Button as NutButton, Textarea as NutTextarea } from '@nutui/nutui-taro';
import { Eye, Image as ImgIcon, Marshalling } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';
import { CommentServiceInstance } from '~/service/comment_service';
import { Origin } from '../const';
import ImgList from './ImgList.vue';
import { uploadImgList } from '../util';

// const { reportComment } = CommentServiceInstance;
const props = defineProps<{
  origin: Origin;
  rootId: number;
  postId: string;
  replyUserId: number;
}>();
const data = reactive<{
  isShowCommentInput: boolean;
  userComment: string;
  parentId: number;
  isPrivate: boolean;
  imgList: string[];
}>({
  isShowCommentInput: false,
  userComment: '',
  parentId: props.rootId,
  isPrivate: false,
  imgList: [],
});
const showCommentBox = (parentId: number) => {
  data.isShowCommentInput = true;
  data.parentId = parentId;
};
const emit = defineEmits(['getComments']);
const submitComment = async () => {
  try {
    Taro.showLoading({
      title: '正在上传图片',
    });
    const mediaUrls = (await uploadImgList(data.imgList)).map(
      (item: { data: string; msg: string; status: number }) => item.data
    ) as string[];
    // todo 异常处理
    Taro.hideLoading();
    await CommentServiceInstance.createCommentForPost(`${props.postId}`, {
      body: data.userComment,
      mediaUrls,
      rootId: props.rootId,
      parentId: data.parentId,
      replyUserId: props.replyUserId,
      privately: data.isPrivate,
    });
    emit('getComments');
    data.userComment = '';
  } finally {
    data.isShowCommentInput = false;
  }
  // console.log(data.userComment);
};
defineExpose({ showCommentBox });
const MAX_IMG_LENGTH = 3;
const handleImgUpload = () => {
  Taro.chooseImage({
    count: MAX_IMG_LENGTH, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success(res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      const { tempFilePaths } = res;
      if (data.imgList.length + tempFilePaths.length > MAX_IMG_LENGTH) {
        Taro.showToast({
          title: '只允许选择三张照片哦 ',
          icon: 'error',
        });
        return;
      }
      data.imgList = data.imgList.concat(tempFilePaths);
    },
  });
};
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
