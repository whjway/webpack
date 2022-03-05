const path = require("path");
const glob = require("glob");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 当前进程的目录
const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const filePaths = glob.sync(path.join(projectRoot, "./src/*/index.js"));

  filePaths.forEach((item) => {
    const match = item.match(/src\/(.*)\/index/);
    const fileName = match && match[1];

    entry[fileName] = item;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `./src/${fileName}/index.html`),
        filename: `${fileName}.html`,
        chunks: ["vendors", "commons", fileName],
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
  entry,
  output: {
    path: path.join(projectRoot, "dist"),
    filename: "js/[name]_[chunkhash:8].js",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: ["babel-loader"],
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
          },
        ],
      },
      //   {
      //     test: /.scss$/,
      //     use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      //   },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
        },
      },
      {
        test: /.(png|svg|jpg|gif|jpeg)$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 10240,
            name: "image/[name]_[hash:8].[ext]",
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
            name: "font/[name]_[hash:8].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name]_[contenthash:8].css",
    }),
    // 清空dist文件 默认是output指定的输出目录
    new CleanWebpackPlugin(),
    // 优化命令行显示日志
    new FriendlyErrorsWebpackPlugin(),
  ].concat(htmlWebpackPlugins),
  stats: "errors-only", // 打包时命令行显示日志
};
