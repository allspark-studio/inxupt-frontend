export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/profile/index',
    'pages/notice/index',
    'pages/topic/index',
    'pages/post/index',
  ],
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
    list: [
      {
        pagePath: 'pages/home/index',
        text: '主页',
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
      },
      {
        pagePath: 'pages/notice/index',
        text: '通知',
      }, {
        pagePath: 'pages/topic/index',
        text: '话题',
      },
      {
        pagePath: 'pages/post/index',
        text: '发布',
      },
    ],
  },
});
