const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const src = path.join(__dirname, 'src')

module.exports = {
  entry: path.join( src, 'App.js'),
  output: {
    path: path.join(__dirname, 'demo'),
    filename:'react-valine.js'
  },
  resolve: {
    extensions: [ '.js', '.json', '.jsx','.css','.scss'],
  },
  module: {
    rules: [
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
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    })
  ]
};