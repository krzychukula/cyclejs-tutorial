module.exports = {
  entry: './src/init.js',
  output: {
    path: 'builds',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
