<template>
  <basic-layout>
    <div class="back-image">
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
            experience="122"
          >
            <template v-slot:suffix>
              <div class="user_attention">
                <nut-tag
                  :color="state.bgColor"
                  style="width: 50px"
                  @click="switchState"
                  class="tag"
                >
                  {{ state.attention }}
                </nut-tag>
              </div>
            </template>
          </user>
        </div>
        <nut-tabs class="othersView_tabs" v-model="state.tab1value" swipeable="true">
          <nut-tab-pane
            :title="'动态' + userData.data.newsNum"
            class="othersView_tabPane"
            style="padding-left: 0px"
          >
            <scroll-view class="scroll_block" scroll-y="true">
              <time-line
                v-for="(item, index) in postData.data.list"
                :key="index"
                :item="item"
              ></time-line>
            </scroll-view>
          </nut-tab-pane>
          <nut-tab-pane :title="'收藏' + userData.data.articleNum" class="othersView_tabPane">
            <scroll-view scroll-y="true" class="scroll_block">
              <div class="card">
                <card></card>
                <card></card>
                <card></card>
              </div>
            </scroll-view>
          </nut-tab-pane>
          <nut-tab-pane :title="'粉丝' + userData.data.fansNum" class="othersView_tabPane">
            <!-- <scroll-view class="scroll_block" scroll-y="true"> -->
            <scroll-view class="scroll_block" @scrolltolower="nextFansDataPage()" scroll-y="true">
              <view>
                <fans-list-item
                  v-for="(item, index) in FansData.data.list"
                  :key="index"
                  :item="item"
                ></fans-list-item>
                <view class="weui-loadmore" v-show="state.searchLoading">
                  <view class="weui-loading"></view>
                  <view class="weui-loadmore__tips">正在加载</view>
                </view>
              </view>
            </scroll-view>
            <!-- </scroll-view> -->
          </nut-tab-pane>
          <nut-tab-pane :title="'关注' + userData.data.followNum" class="othersView_tabPane">
            <scroll-view class="scroll_block" scroll-y="true" @scrolltolower="nextFollowDataPage()">
              <fans-list-item
                v-for="(item, index) in followsData.data.list"
                :key="index"
                :item="item"
              ></fans-list-item>
            </scroll-view>
          </nut-tab-pane>
        </nut-tabs>
      </div>
    </scroll-view>
  </basic-layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Tag as NutTag, Tabs as NutTabs, TabPane as NutTabPane } from '@nutui/nutui-taro';
import BasicLayout from '~/layout/BasicLayout.vue';
import card from './components/card.vue';
import FansListItem from './components/FansListItem.vue';
import timeLine from './components/timeLine.vue';
import user from '~/components/user_info/user.vue';
import OthersViewService from '~/service/othersView_service';

const state = reactive({
  tab1value: '0',
  bgHeight: '30%',
  bgColor: '#FEDA48',
  attention: '关注',
  fansPage: 1,
  followsPage: 1,
  postPage: 1,
  searchLoading: false,
  searchLoadingComplete: false,
  hasMoreData: true,
});
const userData = reactive({
  data: {
    accountAuth: ['string'],
    articleNum: 0,
    avatarUrl: 'string',
    backgroundUrl: 'string',
    description: 'string',
    fansNum: 0,
    followNum: 0,
    followed: true,
    gender: 0,
    grade: 'string',
    hisId: 0,
    level: 0,
    likedNum: 0,
    major: 'string',
    newsNum: 0,
    nickname: 'string',
  },
});
const FansData = reactive({
  data: {
    endRow: 0,
    hasNextPage: true,
    hasPreviousPage: true,
    isFirstPage: true,
    isLastPage: true,
    list: [
      {
        id: 1,
        nickName: 'hello',
        avatarUrl:
          'https://zaixiyou.oss-cn-beijing.aliyuncs.com/user-media/16/2020-10-02/2ffdb292-5e8d-4d05-8acb-15a6dc1dc304.gif',
        accountAuth: ['1'],
        description: 'hello world',
        followed: false,
        level: 3,
      },
    ],
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

const followsData = reactive({
  data: {
    endRow: 0,
    hasNextPage: true,
    hasPreviousPage: true,
    isFirstPage: true,
    isLastPage: true,
    list: [
      {
        id: 20,
        nickName: '（＾ω＾）武林萌主',
        avatarUrl:
          'https://zaixiyou.oss-cn-beijing.aliyuncs.com/user-media/20/2020-11-19/f13d6ff3-39a5-4102-bfd5-7a10444b9105.jpg',
        accountAuth: [''],
        description: '内容丰富，无法概括，请自行脑补',
        followed: false,
        level: null,
      },
    ],
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
    list: [
      {
        postId: 2311,
        type: 1,
        top: false,
        title: null,
        pureText: null,
        cover: null,
        body: '测试',
        mediaUrls: null,
        ats: null,
        authorId: 1,
        authorName: '是阿帅呀',
        authorAvatar:
          'https://zaixiyou.oss-cn-beijing.aliyuncs.com/user-media/1/2020-11-23/3daa25de-5044-4e09-a5fc-7e28c1150c46.gif',
        authorLevel: 3,
        accountAuth: [''],
        authorDescription: '吹不出褶皱的平静日子，也在闪光✨',
        createTime: '2023-04-15 05:52:55',
        tags: null,
        likeNum: 3,
        commentNum: 1,
        favoriteNum: 0,
        coinsNum: 2,
        liked: false,
        favorited: false,
        coined: false,
      },
    ],
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
const switchState = () => {
  if (state.bgColor === '#FEDA48') {
    state.bgColor = 'gainsboro';
    state.attention = '已关注';
  } else {
    state.bgColor = '#FEDA48';
    state.attention = '关注';
  }
};
const othersViewService = new OthersViewService();
const getData = () => {
  try {
    othersViewService.getUserInfo(1).then(function (res) {
      userData.data = res.data.data;
    });
  } catch (error) {
    console.error(error);
  }

  try {
    othersViewService.getFansInfo(1, state.fansPage).then(function (res) {
      FansData.data = res.data.data;
      if (res.data.data.hasNextPage) {
        state.fansPage += 1;
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    othersViewService.getfollowsInfo(1, state.followsPage).then(function (res) {
      followsData.data = res.data.data;
      if (res.data.data.hasNextPage) {
        state.followsPage += 1;
      }
    });
  } catch (error) {
    console.error(error);
  }

  try {
    othersViewService.getPosts(1, state.postPage).then(function (res) {
      postData.data = res.data.data;
      if (res.data.data.hasNextPage) {
        state.postPage += 1;
      }
    });
  } catch (error) {
    console.error(error);
  }
};
getData();

const nextFansDataPage = () => {
  if (state.fansPage <= FansData.data.navigateLastPage) {
    othersViewService.getFansInfo(1, state.fansPage).then(function (res) {
      state.searchLoading = true;
      FansData.data.list.push(...res.data.data.list);
      state.searchLoading = false;
      state.fansPage += 1;
    });
  }
};

const nextFollowDataPage = () => {
  if (state.followsPage <= followsData.data.navigateLastPage) {
    othersViewService.getfollowsInfo(1, state.followsPage).then(function (res) {
      state.searchLoading = true;
      followsData.data.list.push(...res.data.data.list);
      // state.searchLoading = false;
      state.followsPage += 1;
    });
  }
};
</script>

<style lang="scss">
.scroll_box {
  height: 1200px;
}

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
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
