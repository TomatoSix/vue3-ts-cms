const path = require('path')

module.exports = {
  // 打包后的文件到build文件夹下
  outputDir: './build',
  configureWebpack: (config) => {
    // 设置别名
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      components: '@/components',
      '@assets': 'src/assets'
    }
  },

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        // target: 'http://http://192.168.228.7:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
