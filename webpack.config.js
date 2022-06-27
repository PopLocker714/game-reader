const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
    // sw: './sw.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    new WebpackManifestPlugin({})
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.ogg$/,
        loader: 'file-loader'
      }
      // {
      //   test: /\.(png|jpg|svg|gif)$/,
      //   use: ['file-loader'],
      //   // type: 'asset/resource'
      // },
      // {
      //   test: /\.(png|jpg)$/,
      //   loader: 'url-loader'
      // }
    ]
  }
}