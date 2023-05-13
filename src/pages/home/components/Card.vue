<template>
  <div>
    <UserInfo name="星野猫" url="/assets/swiper_images/head.png" :level="3">
      <template v-slot:extra>
        <TimeAgo time="202305071200" />
      </template>
      <template v-slot:suffix>
        <MoreS class="more" @click="showMenu" />
      </template>
    </UserInfo>
    <nut-ellipsis
      class="content"
      content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。"
      direction="end"
      rows="3"
      expandText="全文"
      collapseText="收起"
    ></nut-ellipsis>
    <ul class="interactive">
      <li @click="switchFabulousColor">
        <Fabulous :color="FabulousColor" />
        <span>666</span>
      </li>
      <li @click="switchStarColor">
        <Star :color="StarColor" />
        <span>666</span>
      </li>
      <li>
        <Message />
        <span>666</span>
      </li>
      <li>
        <ShareN />
        <span>666</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { Ellipsis as NutEllipsis } from '@nutui/nutui-taro';
import { MoreS, Fabulous, Star, Message, ShareN } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';
import UserInfo from '~/components/UserInfo/UserInfo.vue';
import TimeAgo from '~/components/TimeAgo.vue';

const FabulousColor = ref('');
const StarColor = ref('');
const item = ['关注', '举报'];
let care = false;
const showMenu = () => {
  Taro.showActionSheet({
    itemList: item,
    success(res) {
      if (res.tapIndex === 0) {
        if (!care) {
          item[res.tapIndex] = '已关注';
          Taro.showToast({
            title: '关注成功',
            icon: 'success',
            duration: 1000,
          });
        } else {
          item[res.tapIndex] = '关注';
          Taro.showToast({
            title: '取消关注',
            icon: 'none',
            duration: 1000,
          });
        }
        care = !care;
      } else {
        Taro.showToast({
          title: '举报成功',
          icon: 'success',
          duration: 1000,
        });
      }
    },
    fail(res) {
      console.log(res.errMsg);
    },
  });
};
const switchFabulousColor = () => {
  if (!FabulousColor.value) {
    FabulousColor.value = '#FEDA48';
  } else {
    FabulousColor.value = '';
  }
};
const switchStarColor = () => {
  if (!StarColor.value) {
    StarColor.value = '#FEDA48';
  } else {
    StarColor.value = '';
  }
};
</script>
