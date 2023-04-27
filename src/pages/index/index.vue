<template>
  <view class="index">
    <view>
      <img src="" alt="" />
    </view>
    {{ msg }} <Dongdong />
    <view class="btn">
      <nut-button type="primary" @click="handleClick('text', msg2, true)"
        >点我</nut-button
      >
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'
import { Dongdong } from '@nutui/icons-vue-taro'

const state = reactive({
  msg: '欢迎使用 NutUI4.0 开发小程序',
  msg2: '你成功了～',
  type: 'text',
  show: false,
  cover: true,
})

const handleClick = (type, msg, cover = false) => {
  console.log(123)
  state.show = true
  state.msg2 = msg
  state.type = type
  state.cover = cover
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
