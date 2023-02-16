class CleanWebpackPlugin {
  // 构造函数
  // 查看options具体参数: https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional
  constructor(options) {
      console.log(options, 'options');
       this.outputPath = '';
  }

  apply(compiler) {
      console.log(compiler, 'compiler')
      // compiler.options获取config文件或shell命令初始化的配置信息
      this.outputPath = compiler.options.output.path;
      // 绑定钩子事件
      const hooks = compiler.hooks;
      hooks.done.tap('clean-webpack-plugin', stats => {
          console.log('done~')
      });
  }

}
module.exports = {
  CleanWebpackPlugin
}