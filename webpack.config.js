const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: Path.resolve(__dirname, 'client/index.html'),
  filename: Path.resolve(__dirname, 'public/index.html'),
});

module.exports = {
  entry: Path.resolve(__dirname, 'client/index.jsx'),
  output: {
    path: Path.resolve(__dirname, 'public/'),
    filename: 'bundle.js',
  },

  mode: process.env.NODE_ENV || 'development',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [Path.resolve(__dirname, 'client/'), 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  plugins: [htmlPlugin],
};
