<template>
  <nut-searchbar
    :style="{ height: navBarHeight + 'px' }"
    v-model="state.searchValue"
    placeholder="在西邮公测活动"
    class="search-bar"
  >
    <template v-slot:leftin>
      <Search2 />
    </template>
  </nut-searchbar>
  <basic-layout class="home">
    <div class="main">
      <swiper class="test-h" :vertical="false" :circular="true" :autoplay="true" interval="3000">
        <swiper-item>
          <view class="demo-text-1"><img src="/assets/swiper_images/test.png" alt="" /></view>
        </swiper-item>
        <swiper-item>
          <view class="demo-text-2"><img src="/assets/swiper_images/test.png" alt="" /></view>
        </swiper-item>
        <swiper-item>
          <view class="demo-text-3"><img src="/assets/swiper_images/test.png" alt="" /></view>
        </swiper-item>
      </swiper>
      <nut-tabs
        class="tabs"
        color="#1a1a1a "
        size="normal"
        background="#E6EAED"
        v-model="state.tab7value"
        swipeable
      >
        <template v-slot:titles>
          <div class="nut-tabs">
            <div
              class="nut-tabs__titles-item"
              @click="state.tab7value = item.paneKey"
              :class="{ active: state.tab7value == item.paneKey }"
              :key="item.paneKey"
              v-for="item in state.list6"
            >
              <span class="nut-tabs__titles-item__text">{{ item.title }}</span>
            </div>
            <div class="sort-category">
              <Switches
                @switch="switchItem"
                :currentIndex="currentIndex"
                :switches="switches"
              ></Switches>
            </div>
          </div>
        </template>
        <nut-tab-pane
          class="pane"
          v-for="item in state.list6"
          :key="item.paneKey"
          :pane-key="item.paneKey"
        >
          <div class="card"><card /></div>
          <div class="card"><card /></div>
          <div class="card"><card /></div>
        </nut-tab-pane>
      </nut-tabs>
    </div>
  </basic-layout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
  Tabs as NutTabs,
  TabPane as NutTabPane,
  Searchbar as NutSearchbar,
} from '@nutui/nutui-taro';
import { Search2 } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';
import BasicLayout from '~/layout/BasicLayout.vue';
import Switches from '~/components/Switches.vue';
import Card from './components/Card.vue';

const currentIndex = ref(0);
const switches = [{ title: '最新' }, { title: '最热' }];
const switchItem = (index: number): void => {
  currentIndex.value = index;
};
const { statusBarHeight = 20 } = Taro.getSystemInfoSync();
const menu = Taro.getMenuButtonBoundingClientRect();
const navBarHeight = (menu.top - statusBarHeight) * 2 + menu.height + statusBarHeight;
const state = reactive({
  searchValue: '',
  tab7value: 'c1',
  tab1value: '0',
  list6: [
    {
      title: '全部',
      paneKey: 'c1',
    },
    {
      title: '生活',
      paneKey: 'c2',
    },
    {
      title: '学术',
      paneKey: 'c3',
    },
    {
      title: '情感',
      paneKey: 'c4',
    },
    {
      title: '其他',
      paneKey: 'c5',
    },
  ],
});
</script>

<style lang="scss">
.search-bar {
  opacity: 1;
  position: sticky;
  width: 750px;
  top: 0px;
  background: white;
  box-sizing: border-box;
  padding-left: 20px;
  padding-bottom: 8px;
  padding-right: 250px;
  align-items: flex-end;
  z-index: 10;
  .search {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
.home {
  width: 750px;
  min-height: 1000px;
  background: #e6eaed;
  position: relative;
  .main {
    width: 750px;
    position: absolute;
  }
  .test-h {
    width: 750px;
    height: 280px;
    box-sizing: border-box;
    background: #e6eaed;
    padding: 20px 20px 0px 20px;
    swiper-item {
      img {
        width: 710px;
        height: 260px;
        border-radius: 30px;
      }
    }
  }
  .tabs {
    .nut-tabs {
      justify-content: start;
      .sort-category {
        position: absolute;
        right: 20px;
        top: 22px;
      }
    }
    .pane {
      background: #e6eaed;
      padding: 10px 20px;
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
    }
  }
}
</style>
