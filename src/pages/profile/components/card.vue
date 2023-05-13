<template>
  <div>
    <UserInfo name="星野猫" url="/assets/swiper_images/head.png" :level="3">
      <template v-slot:extra>
        <TimeAgo time="202305071200" />
      </template>
      <template v-slot:suffix>
        <MoreS class="more" />
      </template>
    </UserInfo>
    <nut-ellipsis
      class="content"
      content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，
      但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，
      同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。"
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
import UserInfo from '~/components/user_info/UserInfo.vue';
import TimeAgo from '~/components/TimeAgo.vue';

const FabulousColor = ref('');
const StarColor = ref('');
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
