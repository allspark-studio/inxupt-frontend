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
}
const topicOptions: topicModel[] = [
  { value: TopicEnum.LIFE, label: '#生活' },
  { value: TopicEnum.LEARN, label: '#学术' },
  { value: TopicEnum.EMOTION, label: '#情感' },
  { value: TopicEnum.OTHER, label: '#其他' },
];

// 控制文本域高度变量
const textareaSize = ref({ minHeight: 400 });
// 文本域输入文字
const textareaValue = ref('');
// 文本域提示信息
const textareaPlaceHolder = ref('tip content');
let selectedTopics = reactive([{ value: TopicEnum.LIFE, label: '#生活' }]);
// 是否提交退出页面，控制是否清楚storage
let checkCommit = false;
function ifTopicSelected(value) {
  return selectedTopics.findIndex((item) => {
    return item.value === value.value;
  });
}
const checkTopicHandler = (value: topicModel) => {
  // selectedTopics.push(value);
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
// 点击提交摁钮处理函数
const commitHandler = () => {
  checkCommit = true;
  // 恢复话题选中列表
  selectedTopics = [{ value: TopicEnum.LIFE, label: '#生活' }];
  // 清空文本信息
  textareaValue.value = '';
  // 清空storage中的文本域信息
  Taro.setStorage({
    data: '',
    key: 'textareaValue',
  });
  Taro.switchTab({
    url: '../home/index',
  });
  Taro.showToast({
    title: '发送成功',
    icon: 'success',
  });
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
  }
}

.popup {
  overflow: visible;
  background: #ffffff;
  height: 30%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;

  .text {
    font-weight: bold;
    margin-top: 150px;

    view {
      text-align: center;
      margin: 20px 0;
    }
  }

  .btnGp {
    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;

    .continueBtn {
      background-color: #feda48;
    }
  }

  .iconBg {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-100px);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      background-color: #feda48;
      width: 170px;
      height: 170px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      image {
        width: 150px;
        height: 150px;
      }
    }
  }
}
</style>
