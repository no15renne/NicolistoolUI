const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
  mode: "development",
  output: {
    filename: 'build.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "css-loader",
        ],
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

