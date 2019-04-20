const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "docs")
  },
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(jpg|png|jpeg)$/,
        use: [
          {
            loader: "url-loader"
          }
        ]
      }
    ]
  }
};
