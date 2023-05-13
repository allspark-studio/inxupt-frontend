<template>
  <basic-layout>
    <div class="back-image">
      <image
        src="../../assets/01.jpg"
        class="othersView_image"
        :style="{ height: state.bgHeight }"
      ></image>
    </div>
    <div class="othersView">
      <div class="user" :style="{ position: fixedStyle.position, top: fixedStyle.top }">
        <user
          url="../../assets/01.jpg"
          :level="3"
          name="星野猫"
          signature="凡事总需研究，才会明白"
          experience="122"
        >
          <template v-slot:suffix>
            <div class="user_attention">
              <nut-tag :color="state.bgColor" style="width: 50px" @click="switchState" class="tag">
                {{ state.attention }}
              </nut-tag>
            </div>
          </template>
        </user>
      </div>
      <nut-tabs class="othersView_tabs" v-model="state.tab1value">
        <nut-tab-pane
          title="动态"
          class="othersView_tabPane"
          @click="switchColor"
          style="padding-top: 0px"
        >
          <time-line></time-line>
          <time-line></time-line>
        </nut-tab-pane>
        <nut-tab-pane title="收藏" class="othersView_tabPane">
          <scroll-view scroll-y="true">
            <div class="card">
              <card></card>
              <card></card>
              <card></card>
            </div>
          </scroll-view>
        </nut-tab-pane>
        <nut-tab-pane title="粉丝" class="othersView_tabPane">
          <fans-list-item></fans-list-item>
        </nut-tab-pane>
        <nut-tab-pane title="关注" class="othersView_tabPane">
          <fans-list-item></fans-list-item>
          <fans-list-item></fans-list-item>
        </nut-tab-pane>
      </nut-tabs>
    </div>
  </basic-layout>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue';
import { Tag as NutTag, Tabs as NutTabs, TabPane as NutTabPane } from '@nutui/nutui-taro';
import BasicLayout from '~/layout/BasicLayout.vue';
import card from './components/card.vue';
import FansListItem from './components/FansListItem.vue';
import timeLine from './components/timeLine.vue';
import user from '~/components/user_info/user.vue';

const state = reactive({
  tab1value: '0',
  bgHeight: '30%',
  bgColor: '#FEDA48',
  attention: '关注',
});

const fixedStyle = reactive({
  position: 'absolute',
  top: '29%',
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
const handleScroll = (e) => {
  if (e.scrollTop > 50) {
    fixedStyle.position = 'fixed';
    fixedStyle.top = '100px';
  } else {
    fixedStyle.position = 'absolute';
    fixedStyle.top = '29%';
  }
};

onMounted(() => {
  wx.pageScrollTo({ scrollTop: 0 });
});
onUnmounted(() => {
  wx.offPageScroll(handleScroll);
});
// wx.onPageScroll(handleScroll)
</script>

<style lang="scss">
.othersView_image {
  z-index: -1;
  width: 100%;
  position: fixed;
}
.othersView {
  justify-content: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  .user {
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    height: 15%;
    width: 90%;
    background-color: #ffffff;
    box-shadow: rgb(231, 227, 227) 0px 10px 24px;
  }
  .othersView_tabs {
    position: absolute;
    width: 100%;
    top: 38%;
  }
  .nut-tabs__titles {
    --nut-tabs-titles-item-active-color: #feda48;
    background-color: white;
  }
}
.card {
  background: #feffff;
  border-radius: 20px;
  margin-bottom: 25px;
  padding-bottom: 10px;
  .content {
    margin: 0px 20px;
    font-size: 30px;
  }
  .interactive {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom: 10px;
    li {
      display: flex;
      span {
        margin-left: 5px;
        margin-top: 3px;
      }
    }
  }
}

.tag {
  --nut-tag-default-color: black;
  display: flex;
  align-items: center;
  width: 60px;
  justify-content: center;
  font-size: 26px;
  margin-top: 59px;
}
</style>
