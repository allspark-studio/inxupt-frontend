<template>
  <span>{{ Ago }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import dayjs from '~/day/dayjs.config';

const props = defineProps<{
  time: string | Date | number;
}>();
const time = dayjs(props.time);
const now = dayjs();
const standardTimeDay = time.format('YYYY-MM-DD');
const standardTimeYear = time.format('YYYY');
dayjs.updateLocale('zh-cn', {
  relativeTime: {
    future: '%s 后',
    past: '%s',
    s: '刚刚',
    ss: '刚刚',
    m: '刚刚',
    mm() {
      if (now.diff(time, 'minute') < 3) return '刚刚';
      return `${now.diff(time, 'minute')}分钟前`;
    },
    h: time.format('今天 HH:mm'),
    hh() {
      if (now.diff(standardTimeDay, 'hour') < 24) {
        return time.format('今天 HH:mm');
      }
      return time.format('昨天 HH:mm');
    },
    d: time.format('昨天 HH:mm'),
    dd() {
      if (now.diff(standardTimeDay, 'day') < 2) return time.format('昨天 HH:mm');
      return time.format('MM.DD');
    },
    M: time.format('MM.DD'),
    MM() {
      if (now.diff(standardTimeYear, 'years') < 1) return time.format('MM.DD');
      return time.format('YYYY.MM.DD');
    },
    y: time.format('YYYY.MM.DD'),
    yy: time.format('YYYY.MM.DD'),
  },
});

const Ago = computed(() => time.fromNow());
</script>
