# 如何搭建项目

1. 创建项目
   `vue create 项目名称`
   有很多选择， 例如选择 vue 版本、typescript、是否安装 Router 和 Vuex
   1. babel 处理 ts 会通过 polyfill 给代码打上补丁
   2. 使用 ESLint 规范代码， 选择 ESLint + Prettier
   3. Babel, ESlint 设置独立的配置文件(原本可以在 package.json 中配置) .eslintrc.js 和 babel.config.js
2. 进行文件配置

   1. editConfig 配置-用于统一代码规范
   2. prettier 用于格式化代码
   3. eslint 配置 不符合 eslint 规范会报警告波浪下划线
   4. git 规范 - 规范 git 提交时格式化代码
   5. commit 规范 - 规范 commit 时的格式规范
   6. commit 提交验证

3. 第三方库集成

   1. 创建 vue.config.js
      用于修改 webpack 配置，最后会被合并到 webpack 中
      详情见官网
      https://cli.vuejs.org/zh/config/#vue-config-js

      可以用来配置别名、代理等等

   2. vue-router

   3. vuex

   4. element-plus 集成

   5. axios 集成

   6. defineComponent 可以更好的支持 ts

# editConfig 用于多人开发时维护一致的编码风格

提交到同一个仓库拉下别人的代码后风格不一致
比如: 不同操作系统的换行符号不一样; 缩进两个还是四个

配置.editorconfig 文件 用于写清楚代码风格
VSCode 会读取该文件，会根据文件内的规范编辑项目代码
需要安装插件 `editorConfig for VSCode` 才会读取该文件

    ```yaml
    # http://editorconfig.org

    root = true

    [*] # 表示所有文件适用
    charset = utf-8 # 设置文件字符集为 utf-8
    indent_style = space # 缩进风格（tab | space）
    indent_size = 2 # 缩进大小
    end_of_line = lf # 控制换行类型(lf | cr | crlf)
    trim_trailing_whitespace = true # 去除行首的任意空白字符
    insert_final_newline = true # 始终在文件末尾插入一个新行

    [*.md] # 表示仅 md 文件适用以下规则
    max_line_length = off
    trim_trailing_whitespace = false
    ```

# prettier 格式化工具

当下最流行的代码格式化工具，保存后会格式化代码
比如全部将双引号改为单引号

1. 安装 prettier 包，让项目开发时依赖这个包
   `npm install prettier -D`
2. 需要配置 .prettierrc 文件

   ```json
   {
     "useTabs": false, // 使用 tab 缩进还是空格缩进，选择 false；
     "tabWidth": 2, // tab 是空格的情况下，是几个空格，选择 2 个；
     "printWidth": 80, // 一行字符的长度，推荐 80，也有人喜欢 100 或者 120；
     "singleQuote": true, // 使用单引号还是双引号，选择 true，使用单引号；
     "trailingComma": "none", // 在多行输入的尾逗号是否添加，设置为 `none`
     "semi": false // 语句末尾是否要加分号，默认值 true，选择 false 表示不加；
   }
   ```

3. 安装插件 Prettier - Code formatter

4. 创建.prettierignore 忽略文件(这些文件就不会被格式化)

   ```
   /dist/*
   .local
   .output.js
   /node_modules/**

   **/*.svg
   **/*.sh

   /public/*
   ```

5. 如何一次性格式化代码
   package.json 中添加脚本
   `prettier": "prettier --write .`
   终端输入 `npm run prettier`就会格式化所有代码

# eslint 配置 - 对代码进行检查符合规范

不符合 eslint 代码规范会有警告, 有波浪下划线

1. .eslintrc.js 文件配置 eslint
2. 安装 ESLint 插件
3. 安装 eslint 依赖 - 创建项目时选择 prettier 会自动安装
   npm install eslint-plugin-prettier eslint-config-prettier -D
4. 在`.eslintrc.js` 中添加 prettier 插件`plugin:prettier/recommended`, 会使 prettier 和 eslint 兼容(重启)

   ```json
     extends: [
       "plugin:vue/vue3-essential",
       "eslint:recommended",
       "@vue/typescript/recommended",
       "@vue/prettier",
       "@vue/prettier/@typescript-eslint",
       'plugin:prettier/recommended' // 使 eslint和prettier兼容， eslint会遵循prettier代码规范
     ],
   ```

# husky - git 提交规范代码

如果组员代码格式不规范时就提交
该插件可以在 git 提交代码前对代码进行检查并格式化代码
保证仓库代码符合 eslint 规范

1.  `npx husky-init '&&' npm install`使用自动配置命令
    会做三件事

    1. 安装 husky 相关依赖

    2. 创建`.husky`文件夹

    3. package.json 会默认添加脚本`prepare: husky install`

2.  pre-commit 文件添加`npm run lint`
    `pre-commit`文件是用来拦截`git commit`之前的一些操作

    添加`npm run lint`会在 git commit 前自动规范代码

# git commit 代码提交规范和限制

使用 commitizen 工具
commitizen 帮助我们编写规范 commit message 的工具
例如 `git commit -m "feat: 新增xx页面"`

1. 安装 commitizen 相关依赖
   `npm install commitizen -D`
2. 安装`cz-conventional-changelog`并初始化
   `npx commitizen init cz-conventional-changelog --save-dev --save-exact`
   会在 package.json 中自动添加
   `"commitizen": { "path": "./node_modules/cz-conventional-changelog" }`

3. 提交代码需要使用 `npx cz`可以选择哪些规范

4. commit 时需要遵循以下规范
   | Type | 作用 |
   | -------- | -------------------------------------------------------------------------------------- |
   | feat | 新增特性 (feature) |
   | fix | 修复 Bug(bug fix) |
   | docs | 修改文档 (documentation) |
   | style | 代码格式修改(white-space, formatting, missing semi colons, etc) |
   | refactor | 代码重构(refactor) |
   | perf | 改善性能(A code change that improves performance) |
   | test | 测试(when adding missing tests) |
   | build | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
   | ci | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
   | chore | 变更构建流程或辅助工具(比如更改测试环境) |
   | revert | 代码回退 |

5. 不符合 commit 规范不允许提交， 使用 commitlint 工具进行代码提交验证

   1. 安装相关依赖
      `npm i @commitlint/config-conventional @commitlint/cli -D`

   2. 在根目录创建 commitlint.config.js 文件，配置 commitlint

      ```js
      module.exports = {
        extends: ['@commitlint/config-conventional']
      }
      ```

   3. 使用 husky 生成 commit-msg 文件，验证提交信息：

      ```shell
      npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
      ```

# vue.config.js

用于修改 webpack 配置, 最后被合并

# vuex

1. 安装依赖最新版匹配 vue3
   `npm install vuex@next`

2. store 文件夹下的 index.ts

   ```ts
   import { createStore } from 'vuex'

   export default createStore({
     state: {},
     mutations: {},
     actions: {},
     modules: {}
   })
   ```

# vue-router

1. 安装依赖最新版匹配 vue3
   `npm install vue-router@next`
2. router 文件夹下的 index.ts

   ```ts
   import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
   import Home from '../views/Home.vue'

   const routes: Array<RouteRecordRaw> = [
     {
       path: '/',
       name: 'Home',
       component: Home
     },
     {
       path: '/about',
       name: 'About',
       component: () =>
         import(/* webpackChunkName: "about" */ '../views/About.vue')
     }
   ]

   const router = createRouter({
     history: createWebHistory(process.env.BASE_URL),
     routes
   })

   export default router
   ```

# axios

# 引入 element-plus

## 全局引用

1. 安装 element-plus
   `npm install element-plus`

2. 全局引用

```js
// src/main.ts文件
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

app.use(ElementPlus)
```

## 局部引入

```js
import { ElButton } from 'element-plus'
import 'element-plus/lib/theme-chalk/el-button.css'
import 'element-plus/lib/theme-chalk/base.css'

export default defineComponent({
  name: 'App',
  components: {
    ElButton
  }
})
```

# 技巧

1. template 中插入图片要添加~, 例如`@/assets/img/logo.svg`

2. pinia 库

# 组件的封装 - base-ui

1. HyForm 的封装

   ```ts
   import { PropType } from 'vue'
   props: {
     // 元素
     formItems: {
       // 把array断言成PropType, PropType 接收一个泛型
       type: Array as PropType<IForm[]>,
       // vue3+ts默认值要求写箭头函数
       default: () => {

       }
     },
     labelWidth: {},
     itemStyle: {},
     colLayout: {}
   },
   ```

   1. v-bind="searchFormConfig" 类似于扩展运算符
   2. :searchFormConfig="searchFormConfig" 则要求组件中的 props 必须有这个属性
   3. v-model 的使用
