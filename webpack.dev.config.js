const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const WebpackBar = require('webpackbar')
const src = path.join(__dirname, 'src')

module.exports = {
  entry: path.join( src, 'index.js'),
  output: {
    path: path.join(__dirname, 'demo'),
    filename:'react-valine.js'
  },
  resolve: {
    extensions: [ '.js', '.json', '.jsx','.css','.scss'],
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        enforce:'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.(js|jsx)$/,
        include:path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  stage: 3,
                }),
              ],
            },
          },
          "sass-loader"
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    })
  ],
  stats: {
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    timings: true,
  },
  devServer: {
    overlay: true,
    noInfo: false,
    clientLogLevel: 'silent',
    stats: 'errors-only',
    hot: true
  } ,
};
