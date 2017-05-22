let ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    'dist/input-moment': './index.js',
    'example/bundle': './example/app.js',
  },
  output: {
    path: __dirname,
    filename: '[name].js',
  },
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {
        test: /\.jsx?$/, exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react", "stage-0"]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'moment': 'moment',
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
      disable: false,
      allChunks: true
    }),
  ]
};
