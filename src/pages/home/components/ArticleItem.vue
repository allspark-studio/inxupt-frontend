<template>
  <div class="article-item">
    <user-info
      :name="articleInfo.authorName"
      :url="articleInfo.authorAvatar"
      :level="articleInfo.authorLevel"
      :userId="articleInfo.authorId"
    >
      <template v-slot:extra>
        <time-ago :time="articleInfo.createTime" />
      </template>
      <template v-slot:suffix>
        <MoreS class="more" @click="showMenu" />
      </template>
    </user-info>
    <div class="article-item__content" @click="navigateToDetailPage(articleInfo.postId)">
      <div>
        {{ articleInfo.pureText }}
      </div>
      <image-list
        v-if="articleInfo.mediaUrls && articleInfo.mediaUrls.length"
        :images="articleInfo.mediaUrls || []"
      ></image-list>
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
      <li @click="navigateToDetailPage(articleInfo.postId)">
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
import ImageList from '~/components/ImageList.vue';
import ArticleService from '~/service/article_service';
import { ArticleFacade } from '~/types/article_types';
import { getPagesPathWithParam } from '~/utils/path_utils';
import { ARTICLE_DETAIL } from '~/constants/route';

const props = defineProps<{
  articleInfo: ArticleFacade;
}>();
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
// 加载时初次判断是否点赞和收藏以及是否关注
const initState = () => {
  state.FabulousColor = props.articleInfo.liked ? '#FEDA48' : '';

  state.StarColor = props.articleInfo.favorited ? '#FEDA48' : '';

  state.item[0] = props.articleInfo.followed ? '已关注' : '关注';
};
// 点击文本跳转详情页
const navigateToDetailPage = (id) => {
  Taro.navigateTo({
    url: `/pages/profile/content?userId=${id}`,
  });
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
  if (state.FabulousColor === '') {
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
  if (state.StarColor === '') {
    state.StarColor = '#FEDA48';
    state.favoriteCount += 1;
    postFavorite(id);
  } else {
    state.StarColor = '';
    state.favoriteCount -= 1;
    postCancelFavorite(id);
  }
};
// 关注用户
async function followUser(userId: number, tappedItem: { tapIndex: number }) {
  try {
    await articleService.followUser(userId);
    state.item[tappedItem.tapIndex] = '已关注';
    Taro.showToast({
      title: '关注成功',
      icon: 'success',
      duration: 1000,
    });
  } catch (e) {
    Taro.showToast({
      title: e.msg,
      icon: 'error',
      duration: 1000,
    });
  }
}
// 取关用户
async function unFollowUser(userId: number, tappedItem: { tapIndex: number }) {
  try {
    await articleService.unFollowUser(userId);
    state.item[tappedItem.tapIndex] = '已关注';
    state.item[tappedItem.tapIndex] = '关注';
    Taro.showToast({
      title: '取消关注',
      icon: 'none',
      duration: 1000,
    });
  } catch (e) {
    Taro.showToast({
      title: e.msg,
      icon: 'error',
      duration: 1000,
    });
  }
}

// 点击更多按钮展示关注和举报菜单栏
const showMenu = () => {
  Taro.showActionSheet({
    itemList: state.item,
    async success(res) {
      if (res.tapIndex === 0) {
        if (state.item[0] === '关注') {
          await followUser(props.articleInfo.authorId, res);
        } else {
          await unFollowUser(props.articleInfo.authorId, res);
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
  &__content {
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
