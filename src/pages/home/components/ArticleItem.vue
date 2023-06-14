<template>
  <div class="article-item">
    <user-info
      :name="articleInfo.authorName"
      :url="articleInfo.authorAvatar"
      :level="articleInfo.authorLevel"
    >
      <template v-slot:extra>
        <time-ago :time="articleInfo.createTime" />
      </template>
      <template v-slot:suffix>
        <MoreS class="more" @click="showMenu" />
      </template>
    </user-info>
    <div class="content">
      {{ articleInfo.pureText }}
    </div>
    <ul class="interactive">
      <li @click="switchFabulousColor(articleInfo.postId)">
        <Fabulous :color="state.FabulousColor" />
        <span>{{ state.likeCount }}</span>
      </li>
      <li @click="switchStarColor(articleInfo.postId)">
        <Star :color="state.StarColor" />
        <span>{{ state.favoriteCount }}</span>
      </li>
      <li>
        <Message />
        <span>{{ articleInfo.commentNum }}</span>
      </li>
      <li>
        <ShareN />
        <span>0</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { MoreS, Fabulous, Star, Message, ShareN } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';
import UserInfo from '~/components/user_info/UserInfo.vue';
import TimeAgo from '~/components/TimeAgo.vue';
import ArticleService from '~/service/article_service';

const props = defineProps(['articleInfo']);
type StateType = {
  likeCount: number;
  favoriteCount: number;
  FabulousColor: string;
  StarColor: string;
  item: string[];
};
const state = reactive<StateType>({
  likeCount: props.articleInfo.likeNum,
  favoriteCount: props.articleInfo.favoriteNum,
  FabulousColor: '',
  StarColor: '',
  item: ['关注', '举报'],
});
const articleService = new ArticleService();
// 点击更多按钮展示关注和举报菜单栏
const showMenu = () => {
  Taro.showActionSheet({
    itemList: state.item,
    async success(res) {
      if (res.tapIndex === 0) {
        if (state.item[0] === '关注') {
          const data = await articleService.careUser(props.articleInfo.authorId);

          if (data.status === 0) {
            state.item[res.tapIndex] = '已关注';
            Taro.showToast({
              title: '关注成功',
              icon: 'success',
              duration: 1000,
            });
          }
        } else {
          const data = await articleService.unfollow(props.articleInfo.authorId);
          if (data.status === 0) {
            state.item[res.tapIndex] = '关注';
            Taro.showToast({
              title: '取消关注',
              icon: 'none',
              duration: 1000,
            });
          }
        }
      } else {
        await articleService.reportArticle(props.articleInfo.postId);

        Taro.showToast({
          title: '举报成功',
          icon: 'success',
          duration: 1000,
        });
      }
    },
    fail() {},
  });
};
// 加载时初次判断是否点赞和收藏以及是否关注
const initState = () => {
  state.FabulousColor = props.articleInfo.liked ? '#FEDA48' : '';

  state.StarColor = props.articleInfo.favorited ? '#FEDA48' : '';

  state.item[0] = props.articleInfo.followed ? '已关注' : '关注';
};
// 发送点赞请求
const postLike = async (id: number) => {
  try {
    await articleService.likeArticle(id);
  } catch (e) {
    state.FabulousColor = '';
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
// 发送取消点赞请求
const postCancelLike = async (id: number) => {
  try {
    await articleService.cancelLikeArticle(id);
  } catch (e) {
    state.FabulousColor = '#FEDA48';
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
// 点赞或取消点赞
const switchFabulousColor = (id: number) => {
  if (!props.articleInfo.liked && state.FabulousColor === '') {
    state.FabulousColor = '#FEDA48';
    state.likeCount += 1;
    postLike(id);
  } else {
    state.FabulousColor = '';
    state.likeCount -= 1;
    postCancelLike(id);
  }
};
// 发送收藏请求
const postFavorite = async (id: number) => {
  try {
    await articleService.favoriteArticle(id);
  } catch (e) {
    state.StarColor = '';
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
// 发送取消收藏请求
const postCancelFavorite = async (id: number) => {
  try {
    await articleService.cancelFavoriteArticle(id);
  } catch (e) {
    state.StarColor = '#FEDA48';
    Taro.showToast({
      icon: 'none',
      title: e.msg,
    });
  }
};
// 收藏或取消收藏
const switchStarColor = (id: number) => {
  if (!props.articleInfo.favorited && state.StarColor === '') {
    state.StarColor = '#FEDA48';
    state.favoriteCount += 1;
    postFavorite(id);
  } else {
    state.StarColor = '';
    state.favoriteCount -= 1;
    postCancelFavorite(id);
  }
};

onMounted(() => {
  initState();
});
</script>

<style lang="scss">
.article-item {
  background: #ffffff;
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
      box-sizing: border-box;
      span {
        margin-left: 5px;
        margin-top: 3px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
