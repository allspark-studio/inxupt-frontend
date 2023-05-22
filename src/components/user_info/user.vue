<template>
  <view class="ix-user-info">
    <view class="ix-user-info__content">
      <nut-avatar v-bind="avatarProps" class="ix-user-info__avatar" size="large">
        <img :src="avatarUrl" />
      </nut-avatar>
      <view class="ix-user-info__detail">
        <view class="ix-user-info__detail__basic">
          <view>{{ nickname }}</view>
          <image src="../icon/sex.png" class="ix-user-info__detail__basic_image"></image>
        </view>
        <view class="ix-user-info__detail__sign">{{ description }}</view>
        <view class="ix-user-info__detail__experience">
          <nut-tag
            round
            type="primary"
            :color="levelColor.backgroundColor"
            :text-color="levelColor.textColor"
            class="ix-user-info__detail__experience__tag"
          >
            {{ levelStr }}
          </nut-tag>
          <view class="ix-user-info__detail__experience__exp">{{ experience }}/500</view>
        </view>
        <view class="ix-user-info__detail__progress">
          <nut-progress percentage="50" :show-text="false" stroke-height="24" size="small" />
        </view>
      </view>
    </view>
    <view class="suffix">
      <slot name="suffix"></slot>
    </view>
  </view>
</template>
<script setup lang="ts">
import { Tag as NutTag, Avatar as NutAvatar, Progress as NutProgress } from '@nutui/nutui-taro';
import { CSSProperties, computed } from 'vue';
import { LEVEL_COLOR_LIST } from './constants';

export interface AvatarProps {
  size?: string;
  shape?: string;
  color?: string;
  bgColor?: string;
}

export interface UserInfoProps {
  nickname: string;
  url: string;
  description: string;
  level: number;
  sex: string;
  avatarUrl: string;
  experience: number;
  userNameStyle?: string | CSSProperties;
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
</script>

<style lang="scss">
.ix-user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
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
      margin-bottom: 0px;
      :not(:first-child) {
        margin-left: 10px;
      }
      &_image {
        height: 40px;
        width: 40px;
      }
    }
    &__sign {
      color: rgb(181, 181, 181);
      font-size: 22px;
    }
    &__experience {
      display: flex;
      align-items: center;
      font-size: 16px;
      margin-top: 4px;
      &__tag {
        font-size: 16px;
      }
      &__exp {
        margin-left: 10px;
        color: rgb(181, 181, 181);
        font-size: 16px;
      }
    }
    &__progress {
      margin-top: 5px;
      width: 280px;
    }
  }
}
</style>
