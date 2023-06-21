<template>
  <nut-searchbar
    :style="{ height: navBarHeight + 'px' }"
    v-model="state.searchValue"
    :placeholder="state.hotSearchList[hotSearchCurrentIndex]"
    class="search-bar"
  >
    <template v-slot:leftin>
      <Search2 />
    </template>
  </nut-searchbar>
  <swiper class="test-h" :vertical="false" :circular="true" :autoplay="true" :interval="3000">
    <swiper-item v-for="(item, index) in state.swiper" :key="index">
      <view><img :src="item" alt="" /></view>
    </swiper-item>
  </swiper>
  <nut-tabs
    class="tabs"
    color="#1a1a1a "
    size="normal"
    background="#E6EAED"
    v-model="state.activeCategory"
  >
    <template v-slot:titles>
      <view class="nut-tabs">
        <view
          class="nut-tabs__titles-item"
          :class="{ active: state.activeCategory == item.paneKey }"
          :key="item.paneKey"
          @click="handleCategoryChange(item.paneKey)"
          v-for="item in state.paneList"
        >
          <span class="nut-tabs__titles-item__text">
            {{ item.title }}
          </span>
        </view>
        <view class="sort-category">
          <switches @change="handleSortChange" active-text="最新" inactive-text="最热"></switches>
        </view>
      </view>
    </template>
    <nut-tab-pane
      class="pane"
      v-for="item in state.paneList"
      :key="item.paneKey"
      :pane-key="item.paneKey"
    >
      <template v-if="state.articleList.length > 0">
        <article-item
          v-for="article in state.articleList"
          :key="article.postId"
          :article-info="article"
        ></article-item>
        <load-more :finished="state.finished"></load-more>
      </template>
      <article-loader v-else></article-loader>
    </nut-tab-pane>
  </nut-tabs>
  <basic-layout class="home"></basic-layout>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted } from 'vue';
import {
  Tabs as NutTabs,
  TabPane as NutTabPane,
  Searchbar as NutSearchbar,
} from '@nutui/nutui-taro';
import { Search2 } from '@nutui/icons-vue-taro';
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { onLoginMounted } from '~/mixins/login_mounted';
import Switches from '~/components/Switches.vue';
import ArticleItem from '~/pages/home/components/ArticleItem.vue';
import ArticleService from '~/service/article_service';
import ArticleLoader from '~/pages/home/components/ArticleLoader.vue';
import { ArticleFacade, CategoryEnum } from '~/types/article_types';
import { PaneItem, PANE_LIST } from '~/pages/home/constants';
import LoadMore from '~/pages/home/components/LoadMore.vue';
import { SortType } from '~/types/common_types';
import BasicLayout from '~/layout/BasicLayout.vue';

type StateType = {
  hotSearchList: any[];
  articleList: ArticleFacade[];
  pageNum: number;
  activeCategory: CategoryEnum;
  searchValue: string;
  paneList: PaneItem[];
  finished: boolean;
  sortType: SortType;
  swiper: string[];
};

const articleService = new ArticleService();
const hotSearchCurrentIndex = ref(0);
const { statusBarHeight = 20 } = Taro.getSystemInfoSync();
const menu = Taro.getMenuButtonBoundingClientRect();
const navBarHeight = (menu.top - statusBarHeight) * 2 + menu.height + statusBarHeight;
const state = reactive<StateType>({
  hotSearchList: [],
  pageNum: 1,
  articleList: [],
  activeCategory: CategoryEnum.ALL,
  searchValue: '',
  paneList: PANE_LIST,
  finished: false,
  sortType: SortType.LATEST,
  swiper: [
    'https://img1.imgtp.com/2023/05/22/Li0MNY0n.png',
    'https://img1.imgtp.com/2023/05/22/Li0MNY0n.png',
    'https://img1.imgtp.com/2023/05/22/Li0MNY0n.png',
  ],
});

/** 定时切换热搜词 */
const hotSearchInterval = setInterval(() => {
  if (hotSearchCurrentIndex.value < state.hotSearchList.length - 1) {
    hotSearchCurrentIndex.value += 1;
  } else {
    hotSearchCurrentIndex.value = 0;
  }
}, 5000);

/** 请求热搜列表 */
const fetchHotSearch = async () => {
  try {
    const { data } = await articleService.getHotSearchList();
    state.hotSearchList = data;
  } catch (e) {
    // 热搜列表为次要请求，报错无需进行全局提示
  }
};
/** 根据搜索关键字请求文章列表 */

/** 请求文章列表 */
const fetchArticles = async () => {
  try {
    const { pageNum, activeCategory } = state;
    const { data } = await articleService.getArticleList({
      categoryId: activeCategory !== CategoryEnum.ALL ? activeCategory : undefined,
      pageNum,
      sortedBy: state.sortType,
    });

    state.finished = !data.hasNextPage;
    if (pageNum === 1) {
      state.articleList = data.list;
    } else {
      state.articleList.push(...data.list);
    }
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};

/**
 * 处理分类改变
 * @param paneKey 当前选中分类
 */
const handleCategoryChange = async (paneKey: CategoryEnum) => {
  state.activeCategory = paneKey;
  state.pageNum = 1;
  state.articleList = [];
  await Taro.pageScrollTo({
    scrollTop: 0,
    duration: 300,
  });
  fetchArticles();
};

/** 处理排序变化 */
const handleSortChange = (switchState: boolean) => {
  state.sortType = switchState ? SortType.LATEST : SortType.HEAT;
  handleCategoryChange(state.activeCategory);
};

/** 下拉刷新 */
usePullDownRefresh(() => {
  handleCategoryChange(state.activeCategory);
});

/** 触底加载更多 */
useReachBottom(() => {
  if (state.finished) return;
  state.pageNum += 1;
  fetchArticles();
});

onLoginMounted(async () => {
  // 并行请求热搜列表和文章列表
  fetchArticles();
  fetchHotSearch();
});

onUnmounted(() => {
  clearInterval(hotSearchInterval);
});
</script>

<style lang="scss">
.search-bar {
  opacity: 0.5;
  position: sticky;
  width: 750px;
  top: 0px;
  background: #fff;
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
  margin-bottom: 5px;
  .nut-tabs {
    justify-content: start;
    .sort-category {
      margin-top: 20px;
      margin-left: 50px;
    }
  }
  .pane {
    background: #e6eaed;
    padding: 10px 20px;
  }
}
</style>
