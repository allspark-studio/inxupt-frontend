import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import 'dayjs/locale/zh-cn'

var config = {
  thresholds: [
  { l: "s", r: 1 },
  { l: "m", r: 1 },
  { l: "mm", r: 59, d: "minute" },
  { l: "h", r: 1 },
  { l: "hh", r: 23, d: "hour" },
  { l: "d", r: 1 },
  { l: "dd", r: 29, d: "day" },
  { l: "M", r: 1 },
  { l: "MM", r: 11, d: "month" },
  { l: "y" },
  { l: "yy", d: "year" },
  ],
}

dayjs.extend(updateLocale)
dayjs.extend(relativeTime, config)
dayjs.locale('zh-cn')
export default dayjs
