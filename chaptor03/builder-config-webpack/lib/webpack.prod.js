const cssnano = require("cssnano");

const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require("./webpack.base");

const prodConfig = {
  mode: "production",
  optimization: {
    splitChunks: {
      // minSize: 0, // 分离包的最小体积
      // maxSize: 1024 * 40,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          minChunks: 1, // 设置最小引用次数
        },
        commons: {
          name: "commons",
          chunks: "all",
          minSize: 1, // 分离包的最小体积
          minChunks: 2, // 设置最小引用次数
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        // exclude: /node_modules/,
        parallel: true,
        uglifyOptions: {
          output: {
            // comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
        extractComments: /@extract/i,
      }),
    ],
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
  ],
};

module.exports = merge(baseConfig, prodConfig);
