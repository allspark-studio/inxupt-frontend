<template>
  <basic-layout>
    <div class="backImg" @click="previewImage"></div>
    <div>
      <image
        :src="userData.data.backgroundUrl"
        class="othersView_image"
        :style="{ height: state.bgHeight }"
      ></image>
    </div>
    <scroll-view class="scroll_box">
      <div class="othersView">
        <div class="user">
          <user
            :avatarUrl="userData.data.avatarUrl"
            :level="userData.data.level"
            :nickname="userData.data.nickname"
            :description="userData.data.description"
            :gender="userData.data.gender"
            experience="122"
          >
            <template v-slot:suffix>
              <div class="user_attention">
                <span>编辑资料</span>
              </div>
            </template>
            <template v-slot:setting>
              <div class="user_setting">
                <Setting />
              </div>
            </template>
          </user>
        </div>
        <nut-tabs
          class="othersView_tabs"
          v-model="state.tab1value"
          :swipeable="true"
          @change="changeTab"
        >
          <nut-tab-pane
            :title="'动态' + '(' + userData.data.newsNum + ')'"
            class="othersView_tabPane"
            style="padding-left: 0rpx"
          >
            <scroll-view
              class="scroll_block"
              scroll-y="true"
              @scrolltolower="nextPostDataPage()"
              @scroll="handleScroll"
            >
              <time-line
                v-for="(item, index) in postData.data.list"
                :key="index"
                :item="item"
              ></time-line>
              <view class="data-loading">{{ state.postIsLoading }}</view>
              <view class="toTop" v-if="state.goTop_show" style="left: 648rpx"></view>
            </scroll-view>
          </nut-tab-pane>
          <nut-tab-pane
            :title="'收藏' + '(' + userData.data.articleNum + ')'"
            class="othersView_tabPane"
          >
            <scroll-view
              scroll-y="true"
              class="scroll_block"
              @scroll="handleScroll"
              @scrolltolower="nextFavoriteDataPage()"
            >
              <view class="card">
                <card
                  v-for="(item, index) in favoriteData.data.list"
                  :key="index"
                  :item="item"
                ></card>
              </view>
              <view class="data-loading">{{ state.favoriteIsLoading }}</view>
              <view class="toTop" v-if="state.goTop_show" style="left: 1400rpx"></view>
            </scroll-view>
          </nut-tab-pane>
          <nut-tab-pane
            :title="'粉丝' + '(' + userData.data.fansNum + ')'"
            class="othersView_tabPane"
          >
            <scroll-view
              ref="scrollContainer"
              class="scroll_block"
              @scrolltolower="nextFansDataPage()"
              scroll-y="true"
              @scroll="handleScroll"
            >
              <view>
                <fans-list-item
                  class="text-data"
                  v-for="(item, index) in FansData.data.list"
                  :key="index"
                  :item="item"
                ></fans-list-item>
              </view>
              <view class="data-loading">{{ state.fansIsLoading }}</view>
              <view class="toTop" v-if="state.goTop_show"></view>
            </scroll-view>
          </nut-tab-pane>
          <nut-tab-pane
            :title="'关注' + '(' + userData.data.followNum + ')'"
            class="othersView_tabPane"
          >
            <scroll-view
              class="scroll_block"
              scroll-y="true"
              @scrolltolower="nextFollowDataPage()"
              @scroll="handleScroll"
            >
              <fans-list-item
                v-for="(item, index) in followsData.data.list"
                :key="index"
                :item="item"
              ></fans-list-item>
              <view class="data-loading">{{ state.followsIsLoading }}</view>
              <view class="toTop" v-if="state.goTop_show" style="left: 2890rpx"></view>
            </scroll-view>
          </nut-tab-pane>
        </nut-tabs>
      </div>
    </scroll-view>
  </basic-layout>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { Tabs as NutTabs, TabPane as NutTabPane } from '@nutui/nutui-taro';
import { Setting } from '@nutui/icons-vue-taro';
import BasicLayout from '~/layout/BasicLayout.vue';
import card from './components/card.vue';
import FansListItem from './components/FansListItem.vue';
import timeLine from './components/timeLine.vue';
import user from './components/user.vue';
import OthersViewService from '~/service/othersView_service';

const props = defineProps({
  id: Number,
});
const state = reactive({
  tab1value: '0',
  bgHeight: '30%',
  fansPage: 1,
  followsPage: 1,
  postPage: 1,
  favoritePage: 1,
  fansIsLoading: ' ',
  followsIsLoading: '',
  postIsLoading: '',
  favoriteIsLoading: '',
  scroll_top: 0,
  goTop_show: false,
  showPreview: false,
  imgData: ['https://shijuepi.com/uploads/allimg/201222/1-2012221T114.jpg'],
});
const userData = reactive({
  data: {
    accountAuth: [''],
    articleNum: 0,
    avatarUrl: '',
    backgroundUrl: '',
    description: '',
    fansNum: 0,
    followNum: 0,
    followed: true,
    gender: 0,
    grade: '',
    hisId: 0,
    level: 0,
    likedNum: 0,
    major: '',
    newsNum: 0,
    nickname: '',
  },
});
const FansData = reactive({
  data: {
    endRow: 0,
    hasNextPage: true,
    hasPreviousPage: true,
    isFirstPage: true,
    isLastPage: true,
    list: [],
    navigateFirstPage: 0,
    navigateLastPage: 0,
    navigatePages: 0,
    navigatepageNums: [],
    nextPage: 0,
    pageNum: 0,
    pageSize: 0,
    pages: 0,
    prePage: 0,
    size: 0,
    startRow: 0,
    total: 0,
  },
});

const followsData = reactive({
  data: {
    endRow: 0,
    hasNextPage: true,
    hasPreviousPage: true,
    isFirstPage: true,
    isLastPage: true,
    list: [],
    navigateFirstPage: 0,
    navigateLastPage: 0,
    navigatePages: 0,
    navigatepageNums: [0],
    nextPage: 0,
    pageNum: 0,
    pageSize: 0,
    pages: 0,
    prePage: 0,
    size: 0,
    startRow: 0,
    total: 0,
  },
});

const favoriteData = reactive({
  data: {
    endRow: 0,
    hasNextPage: true,
    hasPreviousPage: true,
    isFirstPage: true,
    isLastPage: true,
    list: [],
    navigateFirstPage: 0,
    navigateLastPage: 0,
    navigatePages: 0,
    navigatepageNums: [0],
    nextPage: 0,
    pageNum: 0,
    pageSize: 0,
    pages: 0,
    prePage: 0,
    size: 0,
    startRow: 0,
    total: 0,
  },
});
const postData = reactive({
  data: {
    endRow: 0,
    hasNextPage: true,
    hasPreviousPage: true,
    isFirstPage: true,
    isLastPage: true,
    list: [],
    navigateFirstPage: 0,
    navigateLastPage: 0,
    navigatePages: 0,
    navigatepageNums: [0],
    nextPage: 0,
    pageNum: 0,
    pageSize: 0,
    pages: 0,
    prePage: 0,
    size: 0,
    startRow: 0,
    total: 0,
  },
});
const othersViewService = new OthersViewService();
const getData = () => {
  try {
    othersViewService.getUserInfo(props.id).then((res) => {
      userData.data = res.data.data;
      state.imgData[0] = userData.data.backgroundUrl;
    });
  } catch (error) {
    console.error(error);
  }

  try {
    othersViewService.getFansInfo(props.id, state.fansPage).then((res) => {
      FansData.data = res.data.data;
      console.log(props.id);

      state.fansPage += 1;
    });
  } catch (error) {
    console.log(error);
  }

  try {
    othersViewService.getfollowsInfo(props.id, state.followsPage).then((res) => {
      followsData.data = res.data.data;
      state.followsPage += 1;
    });
  } catch (error) {
    console.error(error);
  }

  try {
    othersViewService.getPosts(props.id, state.postPage).then((res) => {
      postData.data = res.data.data;
      state.postPage += 1;
    });
  } catch (error) {
    console.error(error);
  }

  try {
    othersViewService.getFavoriteArticles(props.id, 10).then((res) => {
      favoriteData.data = res.data.data;
      state.favoritePage += 1;
    });
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getData();
});

const nextFansDataPage = () => {
  if (state.fansPage <= FansData.data.navigateLastPage) {
    state.fansIsLoading = '数据加载中...';
    othersViewService.getFansInfo(1, state.fansPage).then((res) => {
      FansData.data.list.push(...res.data.data.list);
      state.fansPage += 1;
      if (state.fansPage > FansData.data.navigateLastPage) {
        state.fansIsLoading = '数据加载完毕';
      }
    });
  }
};

const nextFollowDataPage = () => {
  if (state.followsPage <= followsData.data.navigateLastPage) {
    state.followsIsLoading = '数据加载中...';
    othersViewService.getfollowsInfo(1, state.followsPage).then((res) => {
      followsData.data.list.push(...res.data.data.list);
      state.followsPage += 1;
      if (state.followsPage > followsData.data.navigateLastPage) {
        state.followsIsLoading = '数据加载完毕';
      }
    });
  }
};

const nextPostDataPage = () => {
  if (state.postPage <= postData.data.navigateLastPage) {
    state.postIsLoading = '数据加载中...';
    othersViewService.getPosts(1, state.postPage).then((res) => {
      postData.data.list.push(...res.data.data.list);
      state.postPage += 1;
      if (state.postPage > postData.data.navigateLastPage) {
        state.postIsLoading = '数据加载完毕';
      }
    });
  }
};

const nextFavoriteDataPage = () => {
  if (state.favoritePage <= favoriteData.data.navigateLastPage) {
    state.favoriteIsLoading = '数据加载中';
    othersViewService.getFavoriteArticles(1, state.favoritePage).then((res) => {
      favoriteData.data.list.push(...res.data.data.list);
      state.favoritePage += 1;
      if (state.favoritePage > favoriteData.data.navigateLastPage) {
        state.favoriteIsLoading = '数据加载完毕';
      }
    });
  }
};

const scrollContainer = ref(null);
const handleScroll = (e) => {
  if (e.detail.scrollTop > 150) {
    state.goTop_show = true;
  } else {
    state.goTop_show = false;
  }
};

const previewImage = (e) => {
  const current = e.target.dataset.src;
  wx.previewImage({
    current,
    urls: state.imgData,
  });
};

const changeTab = () => {
  state.goTop_show = false;
};
</script>

<style lang="scss">
.scroll_box {
  height: 1200rpx;
  .othersView {
    .user {
      .user_attention {
        margin-top: 35px;
        margin-right: 17px;
        font-family: 'Yuanti SC';
        font-style: normal;
        font-family: 400;
        color: #ccc;
      }
    }
  }
}
.user_setting {
  margin-left: 75px;
}
.backImg {
  width: 100%;
  height: 260px;
  background-color: transparent;
  z-index: 100;
  position: absolute;
}
.othersView_image {
  z-index: -1;
  width: 100%;
  position: fixed;
}

.othersView_image image {
  width: 100%;
  height: 100%;
}
.othersView {
  justify-content: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1200px;
  box-sizing: border-box;
  .user {
    position: absolute;
    top: 29%;
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
.othersView_tabPane {
  padding-bottom: 0px;
}
.card {
  background: #feffff;
  border-radius: 20px;
  margin-bottom: 25px;
  padding-bottom: 10px;
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

.tag {
  --nut-tag-default-color: black;
  display: flex;
  align-items: center;
  width: 60px;
  justify-content: center;
  font-size: 26px;
  margin-top: 59px;
}
.scroll_block {
  height: 600px;
}
.data-loading {
  height: 30px;
  width: 100%;
  text-align: center;
}
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
.toTop {
  position: fixed;
  left: 2110px;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: rgb(201, 179, 179);
  background-image: url(./icon/top.png);
  background-size: cover;
  bottom: 13px;
  z-index: 10;
}
.hidden {
  display: none;
}
.back-to-top-icon {
  width: 10px;
  height: 10px;
  color: black;
}
</style>
