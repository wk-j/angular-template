let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
var BitbarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        vendor: "./src/vendor.ts",
        main: "./src/app/main.ts",
        //"pdf.worker": "pdfjs-dist/build/pdf.worker.entry"
    },
    output: {
        path: "dist",
        filename: "[name].js",
    },

    htmlLoader: {
      minimize: false // workaround for ng2
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            //{test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=/public/icons/[name].[ext]"},
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.css$/, loader: "to-string-loader!style-loader!css-loader" },
            { test: /\.tsx?$/, loader: "babel-loader?presets[]=es2015!awesome-typescript-loader" },
            { test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/, loader: 'url-loader?limit=30000&name=assets/[name]-[hash].[ext]' },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.(ico|png|jpg|config|gif)$/, loader: "static-loader" }
            //{ test: /materialize-css\/bin\//, loader: 'imports?jQuery=jquery,$=jquery,hammerjs' },
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            { from: "src/images", to: "images" },
            { from: "src/favicon.ico" },
            { from: "src/web.config" },
            //{ from: "src/service-worker.js" },
            //{ from: "src/manifest.json" }
        ]),
        new BitbarWebpackProgressPlugin(),
        new webpack.ProvidePlugin({
          Trianglify: "trianglify",
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery",
          Hammer: "hammerjs/hammer"
        }),
        new HtmlWebpackPlugin({
          title: "Web",
          filename: "index.html",
          template: "src/index.html",
          //hash: true
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    },
};