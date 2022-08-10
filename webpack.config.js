let path = require("path")

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "dist"),
        iife: false
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            path: false
        },
        alias: {
            templates: path.resolve(__dirname, './templates'),
        }
    },
    optimization: {
        minimize: false,
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.twig$/i,
                use: 'raw-loader',
            }
        ]
    }
}