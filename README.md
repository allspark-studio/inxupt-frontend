<div style="text-align: center;">
	<h1>🎉在西邮小程序🎉</h1>
	<span>原在西邮APP小程序版，西安邮电大学 AllSpark 工作室倾情打造😉——让西邮人用上好用的校园类产品✨</span>
	<div style="text-align: center;">
		<a href="https://vuejs.org/">Vue3</a>
    |
    <a href="https://taro.jd.com/">Taro</a>
    |
    <a href="https://nutui.jd.com/#/">NutUI</a>
    |
    <a href="https://pinia.vuejs.org/">Pinia</a>
	</div>
</div>
## 📋 简介

在西邮小程序版本，基于 Vue3 + Taro 开发，使用 NutUI 组件库，使用 Pinia 进行状态管理。

## 🚀 开发

```shell
# 环境要求
node 版本 14+
pnpm 版本 7+
VS Code（开发）
微信开发者工具（调试）
```

准备好环境之后，就可以准备开始开发了。

```shell
# 克隆仓库至本地
git clone https://github.com/allspark-studio/inxupt-frontend.git
# VS Code 打开项目
code ./inxupt-frontend
# 安装依赖
pnpm i
# 启动服务
pnpm dev:weapp
```

启动之后再打开微信开发者工具，打开项目根目录，即可预览运行效果，此时修改代码可以热重载。

## 📦 打包发布

```shell
pnpm build:weapp
```

打包为微信小程序版，后续发布时发布 dist 目录即可。

## ✔️ 代码风格检查

```shell
pnpm lint
```

该命令会检查源码中的 `js` `ts` `vue`等文件，如果出现报错时，需修复后方可合入主干分支。

## ℹ️ 提交信息规范

> 参考：https://zhuanlan.zhihu.com/p/67804026

TODO：配置 husky 提交信息检查。

```shell
[修改类型](修改范围): 标题

正文
```

**修改类型**

- **feat：**提交新功能
- **fix**：修复了bug
- **docs**：只修改了文档
- **style**：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- **refactor**：代码重构，既没修复bug也没有添加新功能
- **perf**：性能优化，提高性能的代码更改
- **test**：添加或修改代码测试
- **chore**：对构建流程或辅助工具和依赖库（如文档生成等）的更改

**修改范围**

简短描述修改的影响范围，当修改影响多个范围时，也可以使用“*”。

**修改简述**

概述修改的内容，不宜过长，不用句号结尾。

## 📝 目录结构及命名规范

### 全局配置

1. 环境相关配置放在`config/`目录下
2. 全局的类型声明文件(`*.d.ts`)放在`types/`目录下
3. 其他插件等配置平铺在项目根目录。

### 源码结构 `src/` 

1. `pages` 目录存放页面相关代码，承载业务逻辑
2. `request` 目录存放请求配置相关代码，对外暴露请求使用的 `axios` 实例，其目录结构尽量与 `pages` 相同
3. `service` 目录存放 api 请求类，业务中引用对应类并实例化后使用，其目录结构尽量与 `pages` 相同
4. `types` 目录存放类型定义相关文件，其目录结构尽量与 `pages` 相同
5. `store` 目录存放 pinia store，其目录结构可以直接平铺
6. `utils` 目录存放全局工具方法 （业务性工具方法可以放在业务页面所在目录的 `utils.ts` 文件中）
7. `constants` 目录存放通用常量 （业务性常量可以定义在业务页面所在目录的 `constants.ts` 文件中）

### 文件命名规范

1. Vue文件采用大驼峰命名(PascalCase)。例如：`DashboardSearch.vue`
2. 页面配置文件 `*.config.ts`。例如：`dashboard_search.config.ts`
3. 除 vue 之外其他文件均采用小驼峰命名(camalCase)。例如：`user_service.ts`
4. service 中的文件均已 `*_service.ts`命名。

