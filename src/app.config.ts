import { PAGES_LIST, TAB_BAR_LIST } from './constants/config_constants';

export default defineAppConfig({
  pages: PAGES_LIST,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    custom: true,
    selectedColor: '#DC143C',
    backgroundColor: '#ffffff',
    list: TAB_BAR_LIST,
  },
  lazyCodeLoading: 'requiredComponents',
});
