const path = require("path");

module.exports = {
    entry: {
        app: './app.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    devtool: 'source-map',
    plugins: [

    ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    externals: {
        "oimo": true,
        "cannon": true,
        "earcut": true,
        "babylonjs": "BABYLON"
    },
    mode: "development"
}
