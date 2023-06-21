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
      return dayjs(props.time).format('M/DD');
    },
    M: dayjs(props.time).format('M/DD'),
    MM() {
      if (now.diff(standardTimeYear, 'years') < 1) return dayjs(props.time).format('M/DD');
      return dayjs(props.time).format('YYYY/M/DD');
    },
    y: dayjs(props.time).format('YYYY/M/DD'),
    yy: dayjs(props.time).format('YYYY/M/DD'),
  },
});

const Ago = computed(() => dayjs(props.time).fromNow());
</script>
