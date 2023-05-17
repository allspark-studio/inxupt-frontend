<template>
  <div>
    <UserInfo
      :name="articleInfo.authorName"
      :url="articleInfo.authorAvatar"
      :level="articleInfo.authorLevel"
    >
      <template v-slot:extra>
        <TimeAgo :time="articleInfo.createTime" />
      </template>
      <template v-slot:suffix>
        <MoreS class="more" @click="showMenu" />
      </template>
    </UserInfo>
    <div class="content">
      {{ articleInfo.pureText }}
    </div>
    <ul class="interactive">
      <li @click="switchFabulousColor(articleInfo.postId)">
        <Fabulous :color="FabulousColor" />
        <span>{{ likeCount }}</span>
      </li>
      <li @click="switchStarColor(articleInfo.postId)">
        <Star :color="StarColor" />
        <span>{{ favoriteCount }}</span>
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
import { ref } from 'vue';
import { MoreS, Fabulous, Star, Message, ShareN } from '@nutui/icons-vue-taro';
import Taro from '@tarojs/taro';
import UserInfo from '~/components/user_info/UserInfo.vue';
import TimeAgo from '~/components/TimeAgo.vue';
import ArticleService from '~/service/article_service';

const props = defineProps(['articleInfo']);
const likeCount = ref(props.articleInfo.likeNum);
const favoriteCount = ref(props.articleInfo.favoriteNum);

const FabulousColor = ref('');
const StarColor = ref('');
const item = ['关注', '举报'];
let care = false;
const articleService = new ArticleService();
const showMenu = async () => {
  Taro.showActionSheet({
    itemList: item,
    async success(res) {
      if (res.tapIndex === 0) {
        if (!care) {
          const data = await articleService.careUser(props.articleInfo.authorId);
          if (data.code === 200) {
            item[res.tapIndex] = '已关注';
            Taro.showToast({
              title: '关注成功',
              icon: 'success',
              duration: 1000,
            });
          }
        } else {
          item[res.tapIndex] = '关注';
          Taro.showToast({
            title: '取消关注',
            icon: 'none',
            duration: 1000,
          });
        }
        care = !care;
      } else {
        Taro.showToast({
          title: '举报成功',
          icon: 'success',
          duration: 1000,
        });
      }
    },
    fail(res) {
      console.log(res.errMsg);
    },
  });
};
const initState = () => {
  if (props.articleInfo.liked) {
    FabulousColor.value = '#FEDA48';
  }
  if (props.articleInfo.favorited) {
    StarColor.value = '#FEDA48';
  }
};
initState();
const switchFabulousColor = async (id) => {
  if (!props.articleInfo.liked && FabulousColor.value === '') {
    FabulousColor.value = '#FEDA48';
    likeCount.value += 1;
    try {
      await articleService.likeArticle(id);
    } catch (e) {
      FabulousColor.value = '';
      Taro.showToast({
        icon: 'none',
        title: e.msg,
      });
    }
  } else {
    FabulousColor.value = '';
    likeCount.value -= 1;
    try {
      await articleService.cancelLikeArticle(id);
    } catch (e) {
      FabulousColor.value = '#FEDA48';
      Taro.showToast({
        icon: 'none',
        title: e.msg,
      });
    }
  }
};
const switchStarColor = async (id) => {
  if (!props.articleInfo.favorited && StarColor.value === '') {
    StarColor.value = '#FEDA48';
    favoriteCount.value += 1;
    try {
      await articleService.favoriteArticle(id);
    } catch (e) {
      StarColor.value = '';
      Taro.showToast({
        icon: 'none',
        title: e.msg,
      });
    }
  } else {
    StarColor.value = '';
    favoriteCount.value -= 1;
    try {
      await articleService.cancelFavoriteArticle(id);
    } catch (e) {
      StarColor.value = '#FEDA48';
      Taro.showToast({
        icon: 'none',
        title: e.msg,
      });
    }
  }
};
</script>
