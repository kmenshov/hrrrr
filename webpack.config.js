const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const htmlPlugin = new HtmlWebpackPlugin({
  template: Path.resolve(__dirname, 'client/index.html'),
  filename: Path.resolve(__dirname, 'public/index.html'),
});

const uglifyJs = new UglifyJsPlugin({
  cache: true,
  parallel: true,
  sourceMap: devMode,
});

const cssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'styles-[chunkhash].css',
});

const optimizeCSS = new OptimizeCSSAssetsPlugin({});

const compressionPlugin = new CompressionWebpackPlugin({
  cache: true,
  threshold: 8192,
});

module.exports = {
  entry: ['@babel/polyfill', Path.resolve(__dirname, 'client/index.jsx')],
  output: {
    path: Path.resolve(__dirname, 'public/'),
    filename: 'bundle-[chunkhash].js',
  },

  mode: process.env.NODE_ENV || 'development',

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [Path.resolve(__dirname, 'client/'), 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  optimization: {
    minimizer: [uglifyJs],
  },

  plugins: [htmlPlugin, cssExtractPlugin, optimizeCSS, compressionPlugin],
};
