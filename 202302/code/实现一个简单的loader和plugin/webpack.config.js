const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入插件
const {  CleanWebpackPlugin } = require('./plugins/clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.txt$/i, // 匹配 *.txt 文件
        use: {
          loader: './loaders/text-loader.js',  // 处理 *.txt 文件的 loader
          options: {
            name: 'gx',
            age: 18
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin()
  ]
}