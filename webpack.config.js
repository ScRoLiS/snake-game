const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
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
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.mp3$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/sounds'
          }
        }
      },
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html',
  }), new MiniCssExtractPlugin()],
  resolve: {
    extensions: ['.ts', '.js']
  }
};