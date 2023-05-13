<template>
  <user-info url="../../assets/01.jpg" :level="3" name="星野猫">
    <template v-slot:extra>
      <div class="extra">
        <span>动态：57</span>
        <span>粉丝：888</span>
      </div>
    </template>
    <template v-slot:suffix>
      <nut-tag :color="state.bgColor" style="width: 50px" @click="switchState" class="suffix_tag">
        {{ state.attention }}
      </nut-tag>
    </template>
  </user-info>
</template>

<script setup>
import { reactive } from 'vue';
import { Tag as NutTag } from '@nutui/nutui-taro';
import UserInfo from '~/components/user_info/UserInfo.vue';

const state = reactive({
  bgColor: '#FEDA48',
  attention: '关注',
});

const switchState = () => {
  if (state.bgColor === '#FEDA48') {
    state.bgColor = 'gainsboro';
    state.attention = '已关注';
  } else {
    state.bgColor = '#FEDA48';
    state.attention = '关注';
  }
};
</script>

<style lang="scss">
.extra {
  display: flex;
  span {
    color: rgb(126, 126, 126);
    font-size: 26px;
    margin: 3px 15px 0 5px;
  }
}
.suffix_tag {
  --nut-tag-default-color: black;
  display: flex;
  align-items: center;
  width: 60px;
  justify-content: center;
  font-size: 26px;
}
</style>
