const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: (pathData) => {
      const filepath = path
        .dirname(pathData.filename)
        .split("/")
        .slice(1)
        .join("/");
      return `${filepath}/[hash][ext]`;
    },
    clean: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    client: {
      overlay: true,
    },
    open: true,
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(mp3|woff)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html',
  }), new MiniCssExtractPlugin({
    filename: 'bundle.css'
  })],
  resolve: {
    extensions: ['.ts', '.js']
  }
};