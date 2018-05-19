
var path = require('path');
var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');


var nodeModulesPath = path.join(__dirname, 'node_modules');
var isProduction = process.env.NODE_ENV == 'production';
var isDevServer = process.env.WEBPACK_ENV == 'devserver';

var config = {
  // debug: !isProduction,
  devtool: isProduction ? false : 'sourcemap',
  context: path.join(__dirname, 'src', 'ts'),
  entry: {
    vendors: [
        'pixi.js',
        'babel-polyfill',
        'pixi-particles',
        'pixi-filters'
    ],
    app: [
      "webpack/hot/only-dev-server",
      path.join(__dirname, 'src', 'ts', 'app.ts')
    ]
  },

  devServer: {
    host: "0.0.0.0",
    port: 8080
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
       'babel-polyfill': path.join(nodeModulesPath, 'babel-polyfill', 'lib', 'index.js')
    }
  },

  output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].js',
      publicPath:''
  },

  module: {
    loaders: [{
      test: /\.html$/, exclude: /node_modules/, loader: 'file-loader?name=[path][name].[ext]'
    },
    {
      // The loader that handles ts and tsx files.  These are compiled
      // with the ts-loader and the output is then passed through to the
      // babel-loader.  The babel-loader uses the es2015 and react presets
      // in order that jsx and es6 are processed.
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loader: 'babel-loader?presets[]=es2015!ts-loader'
    }, {
      // The loader that handles any js files presented alone.
      // It passes these to the babel-loader which (again) uses the es2015
      // and react presets.
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
    new copyWebpackPlugin([
        { from: '../sounds', to: 'sounds' },
        { from: '../images/**/*', to: 'images' },
        { from: '../fonts', to: 'fonts' },
        { from: '../i18n', to: 'i18n' },
        { from: '../config', to: 'config' },
        { from: '../firstAnimation-emulator/draw_animation.txt', to: 'config' },
        { from: '../index.html', to: '' },
        { from: '../index-cheat.html', to: '' },
        { from: '../index-guide.html', to: '' }, //site blitz
        { from: '../notifications', to: 'notifications' }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
};

if (isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
     compress: {
        warnings: false
    }
  }));
}

module.exports = config;
