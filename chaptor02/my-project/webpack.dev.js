const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const filePaths = glob.sync(path.join(__dirname, "./src/*/index.js"));

  filePaths.forEach((item, index) => {
    const match = item.match(/src\/(.*)\/index/);
    const fileName = match && match[1];

    entry[fileName] = item;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `./src/${fileName}/index.html`),
        filename: `${fileName}.html`,
        chunks: [fileName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
        },
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  devtool: "source-map",
  entry: entry,
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
    // vue引用公共cdn，html内要引用script
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: "vue",
    //       entry: "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js",
    //       global: "Vue",
    //     },
    //   ],
    // }),
    new FriendlyErrorsWebpackPlugin(),
  ].concat(htmlWebpackPlugins),
  devServer: {
    contentBase: "./dist",
    hot: true,
    quiet: true,
    // stats: "none", // 打包时命令行显示日志
  },
  watch: false, // 弊端：需手动刷新浏览器
  watchOptions: {
    // 只有开启监听模式时，才有意义
    ignored: /node_modules/,
    aggregateTimeout: 300, // 默认300ms，监听到编号发生后会等300ms再去执行
    poll: 1000, // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒访问1000次
  },
};
