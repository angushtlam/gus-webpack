const path = require('path')

const config = {
  entry: path.join(__dirname, 'client', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'static/'
  },
  module: {
    rules: [
      {
        // Transpile scss files into css then extract them as its own file.
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: 'static/'
            }
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ],
        exclude: /node_modules/
      },
      {
        // Extract static pages into the dist file.
        // Thanks webpack for inlining my html to Javascript then
        // extracting the same crap back into HTML you're the best
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          { loader: 'extract-loader' },
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href'],
              root: path.resolve(__dirname, 'static')
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        // Load jpg files inline
        test: /\.jpg$/,
        use: 'file-loader',
        exclude: /node_modules/
      },
      {
        // Load png files via URL
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: {
            mimetype: 'image/png'
          }
        },
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config
