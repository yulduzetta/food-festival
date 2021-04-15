const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// First, we need to create the main configuration object within our file.
// We'll write options within this object that tell webpack what to do.
// As of webpack version 4, a config file is not necessary,
// but we still want to use one so that we can be more specific with how webpack will function.
module.exports = {
  // The entry point is the root of the bundle and the beginning of the dependency graph,
  // so give it the relative path to the client's code
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },

  // webpack will next take the entry point we have provided, bundle that code,
  //  and output that bundled code to a folder that we specify.
  // It is common and best practice to put your bundled code into a folder named dist, which is short for distribution
  output: {
    path: path.resolve(__dirname, "dist"),

    // The name of each attribute in the entry object will be used in place of [name]
    // in each bundle.js file that is created. So, the bundle file for script.js will
    // be app.bundle.js, the bundle file for events.js will be events.bundle.js,
    // and so on, with each using the key name from each key-value pair in the object for [name].
    filename: "[name].bundle.js",
  },
  module: {
    // This object will identify the type of files to pre-process using the test property to find
    // a regular expression, or regex. In our case, we are trying to process any image file with
    // the file extension of .jpg. We could expand this expression to also search
    // for other image file extensions such as .png, .svg, or .gif.
    rules: [
      {
        test: /\.jpg$/i,
        // specifies where the actual loader is implemented.
        use: [
          {
            loader: "file-loader",
            options: {
              name(file){
                return "[path][name].[ext]"
              },
              publicPath: function (url){
                return url.replace("../", "/assets")
              }
            }
          },
        ],
      },
    ],
  },

  plugins: [
    //Whenever you work with libraries that are dependent on the use of a global variable,
    // just like jQuery is with $ and jQuery, you must tell webpack to make exceptions for these variables by using webpack.ProvidePlugin.
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
  ],

  // By default, webpack wants to run in production mode.
  // In this mode, webpack will minify our code for us automatically,
  // along with some other nice additions.
  mode: "development",
};
