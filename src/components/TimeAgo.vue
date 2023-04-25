<template>
  <span class="time">{{ Ago }}</span>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'TimeAgo',
  props: {
    time: {
      type: [String, Number, Date],
      require: true,
    },
  },
  computed: {
    Ago() {
      const dateTime = dayjs(this.time)
      const now = dayjs()
      const now2 = dayjs(dateTime.format('YYYY-MM-DD'))
      const now3 = dayjs(dateTime.format('YYYY'))
      const differMinutes = now.diff(dateTime, 'minute')
      const differHours = now.diff(dateTime, 'hour')
      const differDays = now.diff(dateTime, 'days')
      const differDays2 = now.diff(now2, 'days')
      const differYears = now.diff(dateTime, 'years')
      const differYears2 = now.diff(now3, 'years')
      // console.log(differYears)
      // console.log(differYears2)

      if (differMinutes < 3) {
        return '刚刚'
      } else if (differMinutes < 60) {
        return `${differMinutes}分钟前`
      } else if (differHours < 24) {
        if (differDays2 < 1) {
          return dateTime.format('今天 HH:mm')
        } else {
          return dateTime.format('昨天 HH:mm')
        }
      } else if (differDays < 2 && differDays >= 1) {
        return dateTime.format('昨天 HH:mm')
      } else if (differYears2 < 1) {
        return dateTime.format('MM.DD')
      } else if (differYears2 >= 1) {
        return dateTime.format('YYYY.MM.DD')
      }
    },
  },
}
</script>

<style scoped>
.time {
  color: grey;
}
</style>
