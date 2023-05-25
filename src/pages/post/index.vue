<template>
  <view class="bgBox">
    <view class="inputCom">
      <nut-textarea
        v-model="textareaValue"
        :autosize="textareaSize"
        limit-show
        max-length="30000"
        :placeholder="textareaPlaceHolder"
      />
    </view>
    <view class="topicCom">
      <view class="topicTip">请选择话题（多选）</view>
      <view class="topicGroup">
        <view
          class="topicItem"
          v-for="(value, index) in topicOptions"
          :key="index"
          @tap="checkTopicHandler(value)"
          :class="ifTopicSelected(value) === index ? 'active' : ''"
        >
          {{ value.label }}
        </view>
      </view>
    </view>
  </view>
  <view class="btnCom">
    <nut-button block @tap="commitHandler">提交</nut-button>
  </view>
</template>

<script setup lang="ts">
import Taro, { useDidHide, useLoad } from '@tarojs/taro';
import { reactive, ref } from 'vue';
import PostService from '~/service/post_service';
// import { TopicEnum } from './constants';
const TopicEnum = {
  LIFE: 'life',
  LEARN: 'learn',
  EMOTION: 'emotion',
  OTHER: 'other',
};

interface topicModel {
  value: string;
  label: string;
  id: number;
}
const topicOptions: topicModel[] = [
  { value: TopicEnum.LIFE, label: '#生活', id: 0 },
  { value: TopicEnum.LEARN, label: '#学术', id: 1 },
  { value: TopicEnum.EMOTION, label: '#情感', id: 2 },
  { value: TopicEnum.OTHER, label: '#其他', id: 3 },
];

// 控制文本域高度变量
const textareaSize = ref({ minHeight: 400 });
// 文本域输入文字
const textareaValue = ref('');
// 文本域提示信息
const textareaPlaceHolder = ref('tip content');
// 所选择的话题信息，默认选择第一个
let selectedTopics = reactive([topicOptions[0]]);
// 是否提交退出页面，控制是否清楚storage
let checkCommit = false;
interface postDataFormat {
  atIds: number[];
  body: string;
  customTags: string[];
  mainTagIds: number[];
  mediaUrls: string[];
}
const postData: postDataFormat = {
  // 用户at功能传输的id
  atIds: [],
  // 帖子正文
  body: textareaValue.value,
  // 帖子自定义标签，暂时置空
  customTags: [],
  // 帖子分类id
  mainTagIds: [],
  // 帖子的图片/视频 url（需要先通过上传接口上传，获取图片/视频 url）
  mediaUrls: [],
};
const postService = new PostService();
// 渲染class
function ifTopicSelected(value) {
  return selectedTopics.findIndex((item) => {
    return item.value === value.value;
  });
}
const checkTopicHandler = (value: topicModel) => {
  const index = selectedTopics.findIndex((item) => {
    return item.value === value.value;
  });
  // 已有值,剔除
  if (index >= 0) {
    selectedTopics.splice(index, 1);
  } else {
    // 未有值，新增
    selectedTopics.push(value);
  }
};
const filterId = () => {
  const idArr: number[] = [];
  selectedTopics.forEach((item) => idArr.push(item.id));
  return idArr;
};
// 点击提交摁钮处理函数
const commitHandler = async () => {
  postData.body = textareaValue.value;
  postData.mainTagIds = filterId();
  try {
    await postService.SubmitPost(postData);
  } catch (e) {
    Taro.showToast({
      title: '发布失败',
    });
  }
  // 使销毁页面为提交后销毁
  checkCommit = true;
  // 恢复话题选中列表
  selectedTopics = [{ value: TopicEnum.LIFE, label: '#生活', id: 0 }];
  // 清空storage中的文本域信息
  Taro.setStorage({
    data: '',
    key: 'textareaValue',
  });
  // 跳转返回主页;
  Taro.switchTab({
    url: '../home/index',
  });
  Taro.showToast({
    title: '发送成功',
    icon: 'success',
  });
  // 清空文字
  textareaValue.value = '';
};
// 用户进入编辑页面默认读取storage中的文本框数据
useLoad(() => {
  Taro.getStorage({
    key: 'textareaValue',
    success({ data }) {
      textareaValue.value = data.value;
    },
  });
});
// 离开页面时的钩子函数，储存文本域中的文字
useDidHide(() => {
  if (checkCommit === false) {
    Taro.setStorage({
      data: textareaValue,
      key: 'textareaValue',
    });
  }
});
</script>
<style lang="scss">
page {
  background-color: rgb(246, 246, 246);
}

.bgBox {
  padding: 30px 20px;

  .inputCom {
    background-color: rgb(255, 255, 255);
    padding: 10px 20px 20px 20px;
    margin-bottom: 30px;
    border-radius: 20px;
  }

  .topicCom {
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    border-radius: 20px;
    .topicTip {
      margin: 20px 0;
      color: gray;
      font-size: 30px;
    }

    .topicGroup {
      display: flex;
      justify-content: space-between;
      .topicItem {
        padding: 15px 30px;
        background-color: #f4f5f9;
        border-radius: 15px;
      }
      .active {
        color: gray;
        background-color: #feda48;
      }
    }
  }

  .btnCom {
    margin-top: 20px;
    background-color: #feda48;
  }
}
</style>
