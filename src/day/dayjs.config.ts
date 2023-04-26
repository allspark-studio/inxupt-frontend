import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.locale('zh-cn')

export default dayjs
