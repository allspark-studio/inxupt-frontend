<template>
  <nut-searchbar
    :style="{ height: navBarHeight + 'px' }"
    v-model="state.searchValue"
    :placeholder="state.hotSearchList[state.hotSearchCurrentIndex]"
    class="search-bar"
  >
    <template v-slot:leftin>
      <Search2 />
    </template>
  </nut-searchbar>
  <basic-layout class="home">
    <div class="main">
      <swiper class="test-h" :vertical="false" :circular="true" :autoplay="true" :interval="3000">
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
        v-model="state.tabvalue"
        swipeable
        @change="switchTab(state.tabvalue)"
      >
        <template v-slot:titles>
          <div class="nut-tabs">
            <div
              class="nut-tabs__titles-item"
              :class="{ active: state.tabvalue == item.paneKey }"
              :key="item.paneKey"
              @click="switchTab(item.paneKey)"
              v-for="item in state.list6"
            >
              <span class="nut-tabs__titles-item__text">
                {{ item.title }}
              </span>
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
          <div class="card" v-for="i in state.articleList" :key="i.postId">
            <card :articleInfo="i" v-show="isshow" />
            <nut-skeleton
              class="skeleton"
              width="340px"
              height="15px"
              animated
              row="3"
              :round="true"
              v-show="!isshow"
            ></nut-skeleton>
          </div>
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
  Skeleton as NutSkeleton,
} from '@nutui/nutui-taro';
import { Search2 } from '@nutui/icons-vue-taro';
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import BasicLayout from '~/layout/BasicLayout.vue';
import Switches from '~/components/Switches.vue';
import Card from './components/Card.vue';
import ArticleService from '~/service/article_service';

const currentIndex = ref(0);
const switches = [{ title: '最新' }, { title: '最热' }];
const { statusBarHeight = 20 } = Taro.getSystemInfoSync();
const menu = Taro.getMenuButtonBoundingClientRect();
const navBarHeight = (menu.top - statusBarHeight) * 2 + menu.height + statusBarHeight;
const isshow = ref(false);
const state = reactive({
  hotSearchCurrentIndex: 0,
  hotSearchList: [],
  articleList: [
    { postId: 'a' },
    { postId: 'b' },
    { postId: 'c' },
    { postId: 'd' },
    { postId: 'e' },
    { postId: 'f' },
    { postId: 'g' },
    { postId: 'h' },
    { postId: 'i' },
    { postId: 'g' },
  ],
  tabvalue: '1',
  searchValue: '',
  list6: [
    {
      title: '全部',
      paneKey: '1',
    },
    {
      title: '生活',
      paneKey: '2',
    },
    {
      title: '学术',
      paneKey: '3',
    },
    {
      title: '情感',
      paneKey: '4',
    },
    {
      title: '其他',
      paneKey: '5',
    },
  ],
});
const hotSearchDisplay = () => {
  setInterval(() => {
    if (state.hotSearchCurrentIndex < state.hotSearchList.length - 1) {
      state.hotSearchCurrentIndex += 1;
    } else {
      state.hotSearchCurrentIndex = 0;
    }
  }, 5000);
};
hotSearchDisplay();

const articleService = new ArticleService();

const getHotSearch = async () => {
  try {
    const { data } = await articleService.getHotSearchList();
    state.hotSearchList = data;
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
getHotSearch();
const whole = async () => {
  try {
    const { data } = await articleService.getArticleList();
    isshow.value = true;
    state.articleList = data.list;
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
const switchTab = async (paneKey) => {
  isshow.value = false;
  try {
    if (paneKey === '1') {
      state.tabvalue = paneKey;
      whole();
      return;
    }
    state.tabvalue = paneKey;
    const { data } = await articleService.getArticleCategoryList(paneKey);
    isshow.value = true;
    state.articleList = data.list;
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
whole();
usePullDownRefresh(() => {
  switchTab(state.tabvalue);
});
useReachBottom(() => {
  console.log('触底刷新');
});
const switchItem = async (index: number) => {
  currentIndex.value = index;
  if (index === 1) {
    await articleService.hotIndexSort();
  } else {
    switchTab(state.tabvalue);
  }
};
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
    margin-bottom: 120px;
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
        .skeleton {
          margin: 10px 10px;
        }
        .content {
          margin: 0px 20px;
          font-size: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          word-break: break-all;
          -webkit-box-orient: vertical;
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
