export default defineAppConfig({
  pages: [
    'pages/index/index',"pages/myInformation/index","pages/notice/index","pages/topicConversation/index"
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  "tabBar":{
    custom:true,
    selectedColor: '#DC143C',
    backgroundColor: '#ffffff',
    list:[
      {
        "pagePath": "pages/index/index",
        "text": "组件"
      },
      {
        "pagePath": "pages/myInformation/index",
        "text": "我的"
      },
      {
        "pagePath": "pages/notice/index",
        "text": "消息"
      },{
        "pagePath": "pages/topicConversation/index",
        "text": "组件"
      }
    ]
  }
});
