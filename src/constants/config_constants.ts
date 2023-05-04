// 由于 taro 的 app.config.ts 不经过webpack编译，因此无法支持路径别名。
// 所以将配置相关的常量统一定义在此处，供业务和配置文件使用。

// ！！！注意：业务中请使用 '~/xxx' 形式引入，不要使用相对路径

import { TabBarItem } from '@tarojs/taro';
import { getPagesPath } from '../utils/path_utils';
import {
  HOME,
  PROFILE,
  NOTICE,
  TOPIC,
  POST,
} from './route';

export const PAGES_PATH_MAP: Record<string, string> = {
  home: getPagesPath(HOME),
  profile: getPagesPath(PROFILE),
  notice: getPagesPath(NOTICE),
  topic: getPagesPath(TOPIC),
  post: getPagesPath(POST),
};

export const PAGES_LIST = [
  PAGES_PATH_MAP.home,
  PAGES_PATH_MAP.profile,
  PAGES_PATH_MAP.notice,
  PAGES_PATH_MAP.topic,
  PAGES_PATH_MAP.post,
];

export const TAB_BAR_LIST: TabBarItem[] = [
  {
    pagePath: PAGES_PATH_MAP.home,
    text: '主页',
    iconPath: '/assets/tab_bar_icons/home.png',
    selectedIconPath: '/assets/tab_bar_icons/home_filled.png',
  },
  {
    pagePath: PAGES_PATH_MAP.topic,
    text: '话题',
    iconPath: '/assets/tab_bar_icons/topic.png',
    selectedIconPath: '/assets/tab_bar_icons/topic_filled.png',
  },
  {
    pagePath: PAGES_PATH_MAP.post,
    text: '发布',
    iconPath: '/assets/tab_bar_icons/add.png',
    selectedIconPath: '/assets/tab_bar_icons/add.png',
  },
  {
    pagePath: PAGES_PATH_MAP.notice,
    text: '通知',
    iconPath: '/assets/tab_bar_icons/bell.png',
    selectedIconPath: '/assets/tab_bar_icons/bell_filled.png',
  },
  {
    pagePath: PAGES_PATH_MAP.profile,
    text: '我的',
    iconPath: '/assets/tab_bar_icons/user.png',
    selectedIconPath: '/assets/tab_bar_icons/user_filled.png',
  },
];
