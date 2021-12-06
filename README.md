# editConfig

.editorconfig 文件 用于设置代码风格
需要安装插件 editorConfig for VSCode 才会读取该文件

# prettier 格式化工具

当下最流行的代码格式化工具，保存后会格式化代码

1. 安装 prettier
   npm install prettier
2. 配置文件 .prettierrc

3. 安装插件 prettier

4. prettierignore 格式化会忽略文件

5. package.json 中
   一次性格式化代码
   "prettier": "prettier --write ."

# eslint 配置

不符合代码规范会有警告

1. 安装 eslint 相关配置
   npm install eslint-plugin-prettier eslint-config-prettier -D


# husky 
git 提交代码前可以格式化代码

# git commit 代码提交规范和限制
commitizen 帮助我们编写规范commit message的工具