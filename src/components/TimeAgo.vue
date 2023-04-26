<template>
  <span>{{ Ago }}</span>
</template>

<script>
import dayjs from "../day/dayjs.config"

export default {
  name: "TimeAgo",
  props: {
    time: {
      type: [String, Number, Date],
      required: true,
    },
  },
  setup(props) {
    const time = dayjs(props.time)
    const now = dayjs()
    dayjs.updateLocale("zh-cn", {
      relativeTime: {
        past: "%s",
        s: "刚刚",
        m: "刚刚",
        mm: function () {
          if (now.diff(time, "minute") < 3) return "刚刚"
          else return now.diff(time, "minute") + "分钟前"
        },
        h: time.format("今天 HH:mm"),
        hh: time.format("今天 HH:mm"),
        d: time.format("昨天 HH:mm"),
        dd: time.format("MM.DD"),
        M: time.format("MM.DD"),
        MM: time.format("MM.DD"),
        y: time.format("YYYY.MM.DD"),
        yy: time.format("YYYY.MM.DD"),
      },
    })

    const Ago = time.fromNow()

    return {
      Ago,
    }
  },
}
</script>
