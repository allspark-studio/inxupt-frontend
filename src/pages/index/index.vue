<template>
  <view class="index">
    <view>
      <img src="" alt="">
    </view>
    {{ msg }} <Dongdong />
    <view class="btn">
      <nut-button type="primary" @click="handleClick('text', msg2, true)">点我</nut-button>
    </view>
    <view>
      <UserInfo :name="state.name" :img="state.img">
        <template #extra>
          <fans v-if="state.show" :dynNum="state.dynNum" :fansNum="state.fansNum"></fans>
          <times v-else :hour="state.hour"></times>
        </template>
        <template #suffix>
          <more :content="state.content"></more>
        </template>
      </UserInfo>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { Dongdong } from '@nutui/icons-vue-taro';
import UserInfo from '../../components/UserInfo.vue';
import fans from '../../components/fans.vue';
import times from '../../components/time.vue';
import more from '../../components/more.vue';

const state = reactive({
  msg: '欢迎使用 NutUI4.0 开发小程序',
  msg2: '你成功了～',
  type: 'text',
  show: false,
  cover: true,
  name: '在西邮',
  dynNum: '88',
  fansNum: '55',
  hour: '4',
  img: 'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png',
  content: '关注',
});

const handleClick = (type, msg, cover = false) => {
  console.log(123);
  state.show = true;
  state.msg2 = msg;
  state.type = type;
  state.cover = cover;
};
</script>

<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
