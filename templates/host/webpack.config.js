const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const path = require('path');
const dependencies = require('./package.json').dependencies;

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
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new ModuleFederationPlugin({
        name: 'projectname-var',
        remotes: {
          app2: 'app2@http://localhost:3002/remoteEntry.js',
        },
        shared: {
          ...dependencies,
          react: { singleton: true, requiredVersion: dependencies.react },
          'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new Dotenv({
        safe: true,
        path: './.env',
      }),
    ],
  };
};
