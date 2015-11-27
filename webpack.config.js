var path = require("path");
module.exports = {
  entry: "./themes/spa/src/index.js",
  output: {
    path: './themes/spa/build/',
    filename: "index.js"
  },
  module: {
    loaders: [
      { 
        test: /\.css$/, 
        loader: ["style", "css"] 
      },
      // https://github.com/babel/babel-loader#usage
      // We use babel to transform ES6 and JSX code.
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel", // 'babel-loader' is also a legal name to reference
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['react']
        }
      },
      // https://www.npmjs.com/package/sass-loader
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [],
  sassLoader: {
    includePath: [path.resolve(__dirname, "./themes/spa/sass")]
  }
};