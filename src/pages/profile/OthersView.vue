<template>
  <div class="backImg" @click="previewImage"></div>
  <div>
    <image
      :src="state.userData.backgroundUrl"
      class="othersView_image"
      :style="{ height: state.bgHeight }"
    ></image>
  </div>
  <scroll-view class="scroll_box">
    <div class="othersView">
      <div class="user">
        <user
          :avatarUrl="state.userData.avatarUrl"
          :level="state.userData.level"
          :nickname="state.userData.nickname"
          :description="state.userData.description"
          :gender="state.userData.gender"
          experience="122"
        >
          <template v-slot:image>
            <div>
              <image :src="sexUrl" class="ix-user-info__detail__basic_image"></image>
            </div>
          </template>
          <template v-slot:suffix>
            <div class="user_attention">
              <nut-tag :color="state.bgColor" style="width: 50px" @click="switchState" class="tag">
                {{ state.attention }}
              </nut-tag>
            </div>
          </template>
        </user>
      </div>
      <nut-tabs class="othersView_tabs" v-model="state.tab1value" @change="changeTab">
        <nut-tab-pane
          :title="`动态(${state.userData.newsNum})`"
          class="othersView_tabPane"
          style="padding-left: 0rpx"
        >
          <scroll-view
            class="scroll_block"
            scroll-y="true"
            @scroll="handleScroll"
            @scrolltolower="onReachPostBottom"
            :scroll-top="state.scrollTop"
          >
            <time-line
              v-for="(item, index) in state.postsList"
              :key="index"
              :item="item"
            ></time-line>
            <load-more :finished="state.postsFinished"></load-more>
            <view class="toTop" v-if="state.goTopShow" style="left: 648rpx" @click="toTop"></view>
          </scroll-view>
        </nut-tab-pane>
        <nut-tab-pane :title="`收藏(${state.userData.articleNum})`" class="othersView_tabPane">
          <scroll-view
            scroll-y="true"
            class="scroll_block"
            @scroll="handleScroll"
            :scroll-top="state.scrollTop"
            @scrolltolower="onReachFavoriteBottom"
          >
            <view class="card">
              <card v-for="(item, index) in state.favoriteList" :key="index" :item="item"></card>
            </view>
            <load-more :finished="state.favoriteFinished"></load-more>
            <view class="toTop" v-if="state.goTopShow" style="left: 1400rpx" @click="toTop"></view>
          </scroll-view>
        </nut-tab-pane>
        <nut-tab-pane :title="`粉丝(${state.userData.fansNum})`" class="othersView_tabPane">
          <scroll-view
            ref="scrollContainer"
            class="scroll_block"
            scroll-y="true"
            @scroll="handleScroll"
            @scrolltolower="onReachFansBottom"
            :scroll-top="state.scrollTop"
          >
            <view>
              <fans-list-item
                class="text-data"
                v-for="(item, index) in state.fansList"
                :key="index"
                :item="item"
              ></fans-list-item>
            </view>
            <load-more :finished="state.fansFinished"></load-more>
            <view class="toTop" v-if="state.goTopShow" @click="toTop"></view>
          </scroll-view>
        </nut-tab-pane>
        <nut-tab-pane :title="`关注(${state.userData.followNum})`" class="othersView_tabPane">
          <scroll-view
            class="scroll_block"
            scroll-y="true"
            @scroll="handleScroll"
            @scrolltolower="onReachFollowsBottom"
            :scroll-top="state.scrollTop"
          >
            <fans-list-item
              v-for="(item, index) in state.followList"
              :key="index"
              :item="item"
            ></fans-list-item>
            <load-more :finished="state.followsFinished"></load-more>
            <view class="toTop" v-if="state.goTopShow" style="left: 2890rpx" @click="toTop"></view>
          </scroll-view>
        </nut-tab-pane>
      </nut-tabs>
    </div>
  </scroll-view>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
import { Tag as NutTag, Tabs as NutTabs, TabPane as NutTabPane } from '@nutui/nutui-taro';
import Taro, { usePullDownRefresh } from '@tarojs/taro';

import card from './components/Card.vue';
import LoadMore from '../home/components/LoadMore.vue';
import FansListItem from './components/FansListItem.vue';
import timeLine from './components/TimeLine.vue';
import user from './components/User.vue';
import OthersViewService from '~/service/othersView_service';
import PostService from '~/service/post_service';
import {
  FansInfoFacade,
  FollowsInfoFacade,
  PostsInfoFacade,
  UserInfoFacade,
  FavoriteInfoFacade,
} from '~/types/person_types';

type StateType = {
  fansList: FansInfoFacade[];
  followList: FollowsInfoFacade[];
  postsList: PostsInfoFacade[];
  favoriteList: FavoriteInfoFacade[];
  userData: UserInfoFacade;
  tab1value: string;
  bgHeight: string;
  bgColor: string;
  attention: string;
  fansPage: number;
  followsPage: number;
  postPage: number;
  favoritePage: number;
  fansFinished: boolean;
  followsFinished: boolean;
  postsFinished: boolean;
  favoriteFinished: boolean;
  scrollTop: number;
  goTopShow: boolean;
  showPreview: boolean;
  imgData: string[];
};

const state = reactive<StateType>({
  fansList: [],
  followList: [],
  postsList: [],
  favoriteList: [],
  userData: {
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
  tab1value: '0',
  bgHeight: '30%',
  bgColor: '#FEDA48',
  attention: '关注',
  fansPage: 1,
  followsPage: 1,
  postPage: 1,
  favoritePage: 1,
  fansFinished: false,
  followsFinished: false,
  postsFinished: false,
  favoriteFinished: false,
  scrollTop: -1,
  goTopShow: false,
  showPreview: false,
  imgData: [''],
});
const props = defineProps({
  id: Number,
});

const sexUrl = computed(() => {
  if (state.userData.gender === 1) {
    return require('~/assets/icon/male.svg');
  }
  if (state.userData.gender === 0) {
    return require('~/assets/icon/female.svg');
  }
  return '';
});
const othersViewService = new OthersViewService();
const fetchUser = async () => {
  try {
    const { data } = await othersViewService.getUserInfo(props.id);
    state.userData = data;
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
const fetchPosts = async () => {
  try {
    const { postPage } = state;
    const { data } = await othersViewService.getPosts(props.id, postPage);
    state.postsFinished = !data.hasNextPage;
    if (postPage === 1) {
      state.postsList = data.list;
    } else {
      state.postsList.push(...data.list);
    }
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};

const fetchFans = async () => {
  try {
    const { fansPage } = state;
    const { data } = await othersViewService.getFansInfo(props.id, fansPage);
    state.fansFinished = !data.hasNextPage;
    if (fansPage === 1) {
      state.fansList = data.list;
    } else {
      state.fansList.push(...data.list);
    }
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};

const fetchFollows = async () => {
  try {
    const { followsPage } = state;
    const { data } = await othersViewService.getfollowsInfo(props.id, followsPage);
    state.followsFinished = !data.hasNextPage;
    if (followsPage === 1) {
      state.followList = data.list;
    } else {
      state.followList.push(...data.list);
    }
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};

const fetchFavorites = async () => {
  try {
    const { favoritePage } = state;
    const { data } = await othersViewService.getFavoriteArticles(props.id, favoritePage);
    state.favoriteFinished = !data.hasNextPage;
    if (favoritePage === 1) {
      state.favoriteList = data.list;
    } else {
      state.favoriteList.push(...data.list);
    }
  } catch (e) {
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};

const getData = () => {
  fetchPosts();
  fetchFans();
  fetchFollows();
  fetchFavorites();
  fetchUser();
};

onMounted(() => {
  getData();
});
usePullDownRefresh(() => {
  state.fansPage = 0;
  state.favoritePage = 0;
  state.followsPage = 0;
  state.followsPage = 0;
  getData();
});

const onReachPostBottom = () => {
  state.postPage += 1;
  fetchPosts();
};

const onReachFansBottom = () => {
  state.fansPage += 1;
  fetchFans();
};

const onReachFollowsBottom = () => {
  state.followsPage += 1;
  fetchFollows();
};

const onReachFavoriteBottom = () => {
  state.favoritePage += 1;
  fetchFavorites();
};

const postService = new PostService();
const followUser = async () => {
  try {
    await postService.followUser(props.id);
    state.bgColor = 'gainsboro';
    state.attention = '已关注';
    state.userData.followed = true;
  } catch (e) {
    Taro.showToast({
      title: e.msg,
      icon: 'error',
      duration: 1000,
    });
  }
};
const unFollowUser = async () => {
  try {
    await postService.followUser(props.id);
    state.bgColor = '#FEDA48';
    state.attention = '关注';
    state.userData.followed = false;
  } catch (e) {
    Taro.showToast({
      title: e.msg,
      icon: 'error',
      duration: 1000,
    });
  }
};

const switchState = () => {
  if (state.userData.followed) {
    unFollowUser();
  } else {
    followUser();
  }
};
const scrollContainer = ref(null);
const handleScroll = (e) => {
  if (e.detail.scrollTop > 150) {
    state.goTopShow = true;
  } else {
    state.goTopShow = false;
    if (e.detail.scrollTop === 0) {
      state.scrollTop = -1;
    }
  }
};
const toTop = () => {
  state.scrollTop = 0;
};
const previewImage = (e) => {
  const current = e.target.dataset.src;
  wx.previewImage({
    current,
    urls: state.imgData,
  });
};
const changeTab = () => {
  state.goTopShow = false;
};
</script>

<style lang="scss">
.scroll_box {
  height: 1200rpx;
  .othersView {
    .user {
      .user_attention {
        margin-top: 35px;
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
  background-color: #feda48;
  background-image: url('~/src/assets/icon/top.svg');
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
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
