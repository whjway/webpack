const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  mode: "development",

  resolve: {
    alias: {
      "@": "/src",
    },
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
      {
        test: /.(png|svg|jpg|gif|jpeg)$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 10240,
          },
        },
      },
      {
        test: /.(woff|woff2|otf|ttf|eot)$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 102,
          },
        },
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  plugins: [
    // 请确保引入这个插件！
    // new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // 与配置的 chunkhash 或 contenthash 有冲突
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  watch: false, // 弊端：需手动刷新浏览器
  watchOptions: {
    // 只有开启监听模式时，才有意义
    ignored: /node_modules/,
    aggregateTimeout: 300, // 默认300ms，监听到编号发生后会等300ms再去执行
    poll: 1000, // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒访问1000次
  },
};
