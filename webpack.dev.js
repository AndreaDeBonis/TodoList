const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    watchFiles: ["./src/*"],
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    hot: true,
  },
});
