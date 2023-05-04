import { PAGES } from '../constants/route';

/**
 * 获取页面文件的路径
 * 例如：首页的页面文件位于 pages/home/index.vue
 * 则 getPagesPath(HOME) => 'pages/home/index';
 * @param subPath pages/下的页面路径
 * @returns
 */
export function getPagesPath(...subPath: string[]) {
  return `${PAGES}/${subPath.join('/')}/index`;
}
