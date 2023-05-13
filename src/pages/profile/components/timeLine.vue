<template>
  <div>
    <div class="timeline" v-for="(item, index) in eventData" :key="index">
      <div class="timeline-left">
        <div class="timeline-left-line"></div>
      </div>
      <div class="timeline-card">
        <div class="timeline-card-title">
          <time-ago :time="eventData.time"></time-ago>
          >
        </div>
        <div class="timeline-card-content">{{ item.event }}</div>
      </div>
    </div>

    <div class="timeline">
      <div class="timeline-left">
        <div class="timeline-card-title">
          <time-ago time="202305071200"></time-ago>
        </div>
        <div class="timeline-left-line"></div>
      </div>
      <div class="timeline-card">
        <div class="timeline-card-content">
          <nut-ellipsis
            class="content"
            content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，
            但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。
            为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。"
            direction="end"
            rows="3"
            expandText="全文"
            collapseText="收起"
          ></nut-ellipsis>
        </div>
      </div>
      <div class="timeline-data">
        <ul class="timeline-data-interactive">
          <li @click="switchFabulousColor">
            <Fabulous :color="FabulousColor" />
            <span>666</span>
          </li>
          <li>
            <Message />
            <span>666</span>
          </li>
          <li>
            <ShareN />
            <span>666</span>
          </li>
        </ul>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Ellipsis as NutEllipsis } from '@nutui/nutui-taro';
import { Fabulous, Message, ShareN } from '@nutui/icons-vue-taro';
import TimeAgo from '~/components/TimeAgo.vue';

// const props = ['eventData'];
const FabulousColor = ref('');
const switchFabulousColor = () => {
  if (!FabulousColor.value) {
    FabulousColor.value = '#FEDA48';
  } else {
    FabulousColor.value = '';
  }
};
</script>
<style lang="scss">
.timeline {
  position: relative;
  margin-top: 40px;
  padding-left: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  &-left {
    margin-right: 5px;
    &-line {
      width: 10px;
      position: absolute;
      top: 35px;
      left: 2px;
      height: 100%;
      padding: 3px;
      border-left: 1px solid rgb(182, 182, 186);
    }
  }
  &-card {
    height: 100%;
    &-title {
      font-size: 6px;
      position: absolute;
      left: -35px;
      font-size: 15px;
      color: rgb(0, 0, 0);
      margin-bottom: 10px;
      color: rgb(172, 172, 172);
    }
    &-content {
      line-height: 40px;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      padding-top: 0px;
    }
  }
  &-data {
    display: block;
    width: 100%;
    &-interactive {
      display: flex;
      justify-content: space-around;
    }
  }
}
.timeline-data-interactive li {
  display: flex;
}
.timeline-data-interactive span {
  margin-left: 5px;
  margin-top: 3px;
}

.content {
  line-height: 46px;
}
</style>
