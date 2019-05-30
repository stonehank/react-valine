'use strict';

const isWsl = require('is-wsl');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const src = path.join(__dirname, 'src')

module.exports= {
  mode: 'production',
  entry: path.join( src, 'react-valine.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename:'react-valine.js',
    library: "react-valine",
    libraryTarget: 'umd',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: !isWsl,
        cache: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
        },
      }),
    ],
  },
  externals: {
    react:'react'
  },

  resolve: {
    extensions: [ '.js', '.json', '.jsx','.css','.scss'],
  },
  module: {
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.js$/,
        include:path.resolve(__dirname, 'src'),
        // exclude:path.resolve(__dirname,'src/App.js'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: true,
          compact: true
        },
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  node:{
    child_process: 'empty'
  }
};