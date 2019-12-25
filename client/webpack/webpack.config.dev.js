const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'buble-loader',
        options: {
          objectAssign: true,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader?sourceMap=true'],
      },
      {
        test: /\.styl$/i,
        use: ['style-loader', 'css-loader?sourceMap=true', 'stylus-loader'],
      },
    ],
  },
  serve: {
    add: app => {
      app.use(convert(history()));
    },
  },
});
