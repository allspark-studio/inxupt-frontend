<template>
  <div class="main">
    <div class="left">
      <span class="ava">
        <nut-avatar v-bind="avatarProps">
          <img :src=url />
        </nut-avatar>
      </span>
      <div class="detail">
        <div class="text">
          {{ name }}
          <nut-tag round type="primary" color="#FFD7A1">{{ levelStr }}</nut-tag>
        </div>
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </div>
    <div class="suffix">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Tag as NutTag, Avatar as NutAvatar } from '@nutui/nutui-taro';
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  url: string;
  avatarProps?: {
    size?: string;
    shape?: string;
    color?: string;
    bgColor?: string;
  }
  level: Number;
}>();

const levelStr = computed(() => `lv${props.level}`);
</script>

<style lang="less">
.main {
  height: 180px;
  .left {
    float: left;
    margin-left: 14px;
    .ava {
      float: left;
      margin-top: 15px;
    }
    .detail {
      float: left;
      margin-top: 30px;
      margin-left: 8px;
      .text {
        text-align: left;
        margin-bottom: 5px;
        font-size: 35px;
        font-weight: 800;
      }
      .extra {
        text-align: left;
        font-size: 30px;
      }
    }
  }
  .suffix {
    float: right;
    margin-top: 60px;
    margin-right: 20px;
    width: 120px;
    height: 60px;
    background-color: #fdda5f;
    border-radius: 5px;
  }
}
</style>
