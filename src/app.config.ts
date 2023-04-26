export default defineAppConfig({
  pages: [
    'pages/index/index',"pages/MyInformation/index","pages/Notice/index","pages/TopicConversation/index","pages/Search/index"
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
        "text": "主页"
      },
      {
        "pagePath": "pages/MyInformation/index",
        "text": "我的"
      },
      {
        "pagePath": "pages/Notice/index",
        "text": "消息"
      },{
        "pagePath": "pages/TopicConversation/index",
        "text": "话题"
      }
      ,{
        "pagePath": "pages/Search/index",
        "text": "搜索"
      }
    ]
  }
});
