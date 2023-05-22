import { CategoryEnum } from '~/types/article_types';

export interface PaneItem {
  title: string;
  paneKey: CategoryEnum;
}

export const PANE_LIST: PaneItem[] = [
  {
    title: '全部',
    paneKey: CategoryEnum.ALL,
  },
  {
    title: '生活',
    paneKey: CategoryEnum.LIFE,
  },
  {
    title: '学术',
    paneKey: CategoryEnum.ACADEMIC,
  },
  {
    title: '情感',
    paneKey: CategoryEnum.EMOTION,
  },
  {
    title: '其他',
    paneKey: CategoryEnum.OTHERS,
  },
];
