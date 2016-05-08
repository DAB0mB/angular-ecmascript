module.exports = {
  entry: [
    __dirname + '/src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'test.bundle.js'
  },
  target: 'web',
  devtool: 'source-map',
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['add-module-exports']
  },
  module: {
    loaders: [{
      test: /test\/src\/.*\.js$/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      'angular-ecmascript': __dirname + '/..'
    }
  }
};