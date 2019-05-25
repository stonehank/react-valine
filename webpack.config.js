
'use strict';

const isWsl = require('is-wsl');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const CleanWebpackPlugin = require('clean-webpack-plugin');




const version = require('./package.json').version
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
let BUILD_PATH = path.resolve(ROOT_PATH, 'dist');




// style files regexes

const sassRegex = /\.(scss|sass)$/;


  module.exports= {
    mode: 'production',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename:'index.js',
      // chunkFilename:'[name].[contenthash:8].chunk.js',
      library: "react-valine",
      libraryTarget: 'commonjs2',
    },
    // optimization: {
      // minimize: true,
      // minimizer: [
      //   new TerserPlugin({
      //     terserOptions: {
      //       parse: {
      //         ecma: 8,
      //       },
      //       compress: {
      //         ecma: 5,
      //         warnings: false,
      //         comparisons: false,
      //         inline: 2,
      //       },
      //       mangle: {
      //         safari10: true,
      //       },
      //       output: {
      //         ecma: 5,
      //         comments: false,
      //         ascii_only: true,
      //       },
      //     },
      //     parallel: !isWsl,
      //     cache: true,
      //   }),
      //   // 压缩css
      //   new OptimizeCSSAssetsPlugin({
      //     cssProcessorOptions: {
      //       parser: safePostCssParser,
      //     },
      //   }),
      // ],
      // splitChunks: {
      //   chunks: 'all',
      //   name: false,
      // },
      // runtimeChunk: true,
    // },
    externals: {
      'react':'React',
      'leancloud-storage':'leancloud-storage'
    },
    // 对引用和别名解析
    resolve: {
      extensions: [ '.js', '.json', '.jsx','.css','.scss'],
    },
    module: {
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          // include:path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
          options: {
            // cacheDirectory: true,
            // cacheCompression: true,
            // compact: true,
            presets: ["@babel/preset-env", "@babel/preset-react"],
            // plugins: ["@babel/plugin-syntax-dynamic-import"]
          },
        },
        {
          test: sassRegex,
          use: [
            // {
            //   loader: MiniCssExtractPlugin.loader,
            //   options: {
            //     publicPath:'../'
            //   }
            // },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    autoprefixer: {
                      flexbox: 'no-2009',
                    },
                    stage: 3,
                  }),
                ],
              },
            },
            {
              loader:'sass-loader'
            }
          ] ,
          sideEffects: true,
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      // 独立打包css
      // new MiniCssExtractPlugin({
      //   filename: '[name].[contenthash:8].css',
      //   chunkFilename: '[name].[contenthash:8].chunk.css',
      // }),
    ].filter(Boolean),

  };