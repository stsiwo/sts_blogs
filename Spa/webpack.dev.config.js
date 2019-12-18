const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // dev server outputs bundled file in contentBase directory, but where you define in output property
  devServer: {
    contentBase: __dirname,
    hot: true,
    historyApiFallback: true,
    port: 80 
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env.dev'
    })
  ]
}); 
