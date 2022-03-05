const cssnano = require("cssnano");

const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require("./webpack.base");
// 优化
// loader打包用时
const speedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
// bundle引用资源分析
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// 并行开启缓存 压缩
const terserWebpackPlugin = require("terser-webpack-plugin");
// 缓存
const cacheLoader = require("cache-loader");
const smp = new speedMeasureWebpackPlugin();
const prodConfig = {
  mode: "none",
  stats: "normal", //| boolean | "none" | "errors-only" | "minimal" | "normal" | "detailed" | "verbose" | "errors-warnings"
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    // new webpackBundleAnalyzer(),
  ],
  optimization: {
    splitChunks: {
      minSize: 0, // 分离包的最小体积
      // maxSize: 1024 * 40,
      cacheGroups: {
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: "vendors",
        //   chunks: "all",
        //   minChunks: 1, // 设置最小引用次数
        // },
        commons: {
          name: "commons",
          chunks: "all",
          // minSize: 1, // 分离包的最小体积
          minChunks: 2, // 设置最小引用次数
        },
      },
    },
    // minimize: true,
    // minimizer: [
    //   new terserWebpackPlugin({
    //     parallel: 4,
    //     cache: true,
    //     exclude: /node_modules/,
    //     terserOptions: {
    //       compress: {
    //         drop_console: true,
    //       },
    //     },
    //   }),
    //   // new UglifyJsPlugin({
    //   //   exclude: /node_modules/,
    //   //   parallel: true,
    //   //   // cache: true,
    //   //   uglifyOptions: {
    //   //     output: {
    //   //       // comments: false,
    //   //     },
    //   //     compress: {
    //   //       // drop_console: true,
    //   //     },
    //   //   },
    //   //   extractComments: /@extract/i,
    //   // }),
    // ],
  },
};

module.exports = merge(baseConfig, prodConfig);
// module.exports = smp.wrap(merge(baseConfig, prodConfig));
