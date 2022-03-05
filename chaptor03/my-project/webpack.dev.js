const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    quiet: true,
    stats: 'none', // 打包时命令行显示日志
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 与配置的 chunkhash 或 contenthash 有冲突
  ],
};

module.exports = merge(baseConfig, devConfig);
