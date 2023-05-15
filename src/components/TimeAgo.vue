<template>
  <span>{{ Ago }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import dayjs from '~/day/dayjs.config';

const props = defineProps<{
  time: string | Date | number;
}>();
const now = dayjs();
const standardTimeDay = dayjs(props.time).format('YYYY-MM-DD');
const standardTimeYear = dayjs(props.time).format('YYYY');
dayjs.updateLocale('zh-cn', {
  relativeTime: {
    future: '%s 后',
    past: '%s',
    s: '刚刚',
    ss: '刚刚',
    m: '刚刚',
    mm() {
      if (now.diff(dayjs(props.time), 'minute') < 3) return '刚刚';
      return `${now.diff(dayjs(props.time), 'minute')}分钟前`;
    },
    h: dayjs(props.time).format('今天 HH:mm'),
    hh() {
      if (now.diff(standardTimeDay, 'hour') < 24) {
        return dayjs(props.time).format('今天 HH:mm');
      }
      return dayjs(props.time).format('昨天 HH:mm');
    },
    d: dayjs(props.time).format('昨天 HH:mm'),
    dd() {
      if (now.diff(standardTimeDay, 'day') < 2) return dayjs(props.time).format('昨天 HH:mm');
      return dayjs(props.time).format('MM.DD');
    },
    M: dayjs(props.time).format('MM.DD'),
    MM() {
      if (now.diff(standardTimeYear, 'years') < 1) return dayjs(props.time).format('MM.DD');
      return dayjs(props.time).format('YYYY.MM.DD');
    },
    y: dayjs(props.time).format('YYYY.MM.DD'),
    yy: dayjs(props.time).format('YYYY.MM.DD'),
  },
});

const Ago = computed(() => {
  if (props.time) {
    try {
      if (dayjs(props.time).isValid()) {
        return dayjs(props.time).fromNow();
      }
      console.log(`时间校验失败：${props.time} 不是合法的日期时间格式。`);
      return '';
    } catch (error) {
      console.log('时间校验出错：', error.message);
    }
  }
  console.log('传入时间为空');
  return '';
});
</script>
