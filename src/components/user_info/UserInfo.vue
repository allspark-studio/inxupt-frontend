<template>
  <view class="ix-user-info">
    <view class="ix-user-info__content" @click="navigateToUserDetail(userId)">
      <nut-avatar v-bind="avatarProps" class="ix-user-info__avatar">
        <img :src="url" />
      </nut-avatar>
      <view class="ix-user-info__detail">
        <view class="ix-user-info__detail__basic">
          <view :style="userNameStyle">{{ name }}</view>
          <nut-tag
            round
            type="primary"
            :color="levelColor.backgroundColor"
            :text-color="levelColor.textColor"
          >
            {{ levelStr }}
          </nut-tag>
        </view>
        <view class="ix-user-info__detail__extra">
          <slot name="extra"></slot>
        </view>
      </view>
    </view>
    <view class="suffix">
      <slot name="suffix"></slot>
    </view>
  </view>
</template>
<script setup lang="ts">
import { Tag as NutTag, Avatar as NutAvatar } from '@nutui/nutui-taro';
import { computed, CSSProperties } from 'vue';
import Taro from '@tarojs/taro';
import { LEVEL_COLOR_LIST } from './constants';
import { PAGES_PATH_MAP } from '~/constants/config_constants';

export interface AvatarProps {
  size?: string;
  shape?: string;
  color?: string;
  bgColor?: string;
}

export interface UserInfoProps {
  name: string;
  url: string;
  level: number;
  userId: number;
  userNameStyle?: CSSProperties;
  avatarProps?: AvatarProps;
}

const props = defineProps<UserInfoProps>();

const levelStr = computed(() => `LV${props.level}`);
const levelColor = computed(() => {
  if (!props.level) {
    return LEVEL_COLOR_LIST[0];
  }
  if (props.level > 6) {
    return LEVEL_COLOR_LIST[5];
  }
  return LEVEL_COLOR_LIST[props.level - 1];
});
// 点击头像或昵称跳转到用户详情页面
const navigateToUserDetail = (id: number) => {
  Taro.navigateTo({
    url: `/${PAGES_PATH_MAP.userProfile}?id=${id}`,
  });
};
</script>

<style lang="scss">
.ix-user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  &__content {
    display: flex;
  }
  &__avatar {
    overflow: hidden;
  }
  &__detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    &__basic {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      :not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}
</style>
