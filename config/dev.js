// 开发环境下打包配置
module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {
    // api 请求基路径
    API_BASE_URL: 'http://localhost:8080',
  },
  mini: {},
  h5: {},
};
