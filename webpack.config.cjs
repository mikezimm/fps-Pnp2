const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  mode: 'development', // switch to production when you package for production - impacts final size of package you import
  target: 'web',
  entry: {
    fpsPnp2: path.resolve(__dirname, 'src/index.ts')  // myServices is the name of the library - external reference name:  myServices.js
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",  // [name] Comes from entry
    publicPath: "/assets/",
    library: { type: "amd" },  // Used by SPFx
    clean: true
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules']
  },
  module: {
    rules: [{
      test: /\.tsx|.ts?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            transpileOnly: true,
          },
        },
      ]
    },
    {
      test: /\.svg/,
      type: 'asset/resource'
    }]
  },
  externals: { // Read webpack documentation - do not want to bundle these into the package
    // "@mikezimm/fps-js": "*",
  },
  devServer: {
    compress: true,
    hot: true,
    port: 3000,
    static: {
      directory: resolveAppPath('app'),
      publicPath: '/',
    },
  }
};