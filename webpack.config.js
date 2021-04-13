const path = require("path");
const webpack = require("webpack");

// First, we need to create the main configuration object within our file.
// We'll write options within this object that tell webpack what to do.
// As of webpack version 4, a config file is not necessary,
// but we still want to use one so that we can be more specific with how webpack will function.
module.exports = {
  // The entry point is the root of the bundle and the beginning of the dependency graph,
  // so give it the relative path to the client's code
  entry: "./assets/js/script.js",

  // webpack will next take the entry point we have provided, bundle that code,
  //  and output that bundled code to a folder that we specify.
  // It is common and best practice to put your bundled code into a folder named dist, which is short for distribution
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },

  plugins: [
    //Whenever you work with libraries that are dependent on the use of a global variable,
    // just like jQuery is with $ and jQuery, you must tell webpack to make exceptions for these variables by using webpack.ProvidePlugin.
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],

  // By default, webpack wants to run in production mode.
  // In this mode, webpack will minify our code for us automatically,
  // along with some other nice additions.
  mode: "development",
};
