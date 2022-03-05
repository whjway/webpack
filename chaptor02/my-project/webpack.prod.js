const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
// const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
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
  entry: entry,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name]-[chunkhash:8].js",
  },
  mode: "production",
  // mode: "none", // 为了测试scope-hoisting方便mode改为none

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
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            // 提取到.postcssrc.js配置文件中 css less vue都可使用
            // options: {
            //   plugins: () => [
            //     require("autoprefixer")({
            //       overrideBrowserslist: ["last 2 version", ">1%", "ios 7"],
            //     }),
            //   ],
            // },
          },
        ],
      },

      {
        test: /.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            // 提取到.postcssrc.js配置文件中 css less vue都可使用
            // options: {
            //   plugins: () => [
            //     require("autoprefixer")({
            //       overrideBrowserslist: ["last 2 version", ">1%", "ios 7"],
            //     }),
            //   ],
            // },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
          // 提取到.postcssrc.js配置文件中 css less vue都可使用
          // options: {
          //   postcss: [
          //     require("autoprefixer")({
          //       overrideBrowserslist: ["last 2 version", ">1%", "ios 7"],
          //     }),
          //   ],
          // },
        },
      },
      {
        test: /.(png|svg|jpg|gif|jpeg)$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 10240,
            name: "image/[name][hash:8].[ext]",
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
            name: "font/[name][hash:8].[ext]",
          },
        },
      },
    ],
  },
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
    // 请确保引入这个插件！
    // new VueLoaderPlugin(),
    // 清空dist文件 默认是output指定的输出目录
    new CleanWebpackPlugin(),
    // 独立出css文件
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash].css", // 更改打包输出路径
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: "vue",
    //       entry: "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js",
    //       global: "Vue",
    //     },
    //   ],
    // }),
    // webpack4默认开启，为了测试scope-hoisting方便mode改为none，手动引入
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // 命令行打包日志
    new FriendlyErrorsWebpackPlugin(),
    // build error异常终端测试
    // function() {
    //   this.hooks.done.tap("done", (stats) => {
    //     if (
    //       stats.compilation.errors &&
    //       stats.compilation.errors.length &&
    //       process.argv.indexOf("- -watch") == -1
    //     ) {
    //       console.log("build error");
    //       process.exit(1);
    //     }
    //   });
    // },
  ].concat(htmlWebpackPlugins),
  stats: "errors-only", // 打包时命令行显示日志
};
