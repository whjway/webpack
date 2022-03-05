const path = require("path");
const glob = require("glob");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";
const PATHS = {
  src: path.join(__dirname, "src"),
};

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
    filename: isProduction
      ? "js/[name]_[chunkhash:8].js"
      : "js/[name]_[hash:8].js",
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
        include: path.resolve("src"),
        use: [
          /* 
            开启多进程打包。 
            进程启动大概为600ms，进程通信也有开销。
            只有工作消耗时间比较长，才需要多进程打包
          */
          // {
          //   loader: "thread-loader",
          //   options: {
          //     workers: 3,
          //   },
          // },
          "cache-loader",
          "babel-loader?cacheDirectory=true",
        ],
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
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false,
              limit: 10240,
              name: "image/[name]_[hash:8].[ext]",
            },
          },
          // {
          //   loader: "image-webpack-loader",
          //   options: {
          //     mozjpeg: {
          //       progressive: true,
          //     },
          //     // optipng.enabled: false will disable optipng
          //     optipng: {
          //       enabled: false,
          //     },
          //     pngquant: {
          //       quality: [0.65, 0.9],
          //       speed: 4,
          //     },
          //     gifsicle: {
          //       interlaced: false,
          //     },
          //     // the webp option will enable WEBP
          //     webp: {
          //       quality: 75,
          //     },
          //   },
          // },
        ],
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
      filename: isProduction
        ? "css/[name]_[contenthash:8].css"
        : "css/[name]_[hash:8].css",
    }),
    // 清空dist文件 默认是output指定的输出目录
    new CleanWebpackPlugin(),
    // 优化命令行显示日志
    new FriendlyErrorsWebpackPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
  ].concat(htmlWebpackPlugins),
  // stats: "errors-only", // 打包时命令行显示日志
};
