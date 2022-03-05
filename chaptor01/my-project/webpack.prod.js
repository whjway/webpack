const path = require("path");
// const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name]-[chunkhash:8].js",
  },
  mode: "production",

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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
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
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        // exclude: /node_modules/,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false,
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
    new MiniCssExtractPlugin({
      // 独立出css文件
      filename: "css/[name]-[contenthash].css", // 更改打包输出路径
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      filename: "index.html",
      chunks: ["index"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/search.html"),
      filename: "search.html",
      chunks: ["search"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      },
    }),
  ],
};
