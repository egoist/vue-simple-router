module.exports = {
  entry: ['./index'],
  output: {
    path: __dirname + '/dist',
    filename: 'vsr.js',
    libraryTarget: 'umd',
    library: 'router'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: [/node_modules/] }
    ]
  },
  babel: {
    presets: ["es2015", "stage-0"]
  },
  plugins: []
};
