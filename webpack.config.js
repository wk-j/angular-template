let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
var BitbarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        vendor: "./src/vendor.ts",
        main: "./src/app/main.ts"
    },
    output: {
        path: __dirname  + "/dist",
        filename: "[name].js",
    },

    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".html"]
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: "to-string-loader!style-loader!css-loader" },
            //{ test: /\.css$/, loader: "css-loader" },
            { test: /\.tsx?$/, loader: "babel-loader?presets[]=es2015!awesome-typescript-loader" },
            { test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/, loader: 'url-loader?limit=30000&name=assets/[name]-[hash].[ext]' },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.(ico|png|jpg|config|gif)$/, loader: "static-loader" }
        ],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                htmlLoader: {
                    minimize: false
                },
                preLoaders: [
                    { test: /\.js$/, loader: "source-map-loader" }
                ]
            }
        }),

        new CopyWebpackPlugin([
            { from: "src/images", to: "images" },
            { from: "src/favicon.ico" },
            { from: "src/web.config" }
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
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    },
};