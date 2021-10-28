const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');
const env = require('dotenv').config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  if (next.startsWith('PUBLIC_')) {
    prev[next] = JSON.stringify(env[next]);
  }
  return prev;
}, {});

module.exports = (_, args) => {
  return {
    entry: './src/index',
    mode: args.mode,
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: process.env.PORT || 3001,
    },
    output: {
      publicPath: 'auto',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /bootstrap\.tsx$/,
          loader: 'bundle-loader',
          options: {
            lazy: true,
          },
        },
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'app_host',
        remotes: {
          app2: 'app2@http://localhost:3002/remoteEntry.js',
        },
        shared: ['react', 'react-dom'],
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new Dotenv({
        safe: true,
        path: './.env',
      }),
      new webpack.DefinePlugin({
        Environments: envKeys,
      }),
    ],
  };
};
