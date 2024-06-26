var path = require("path");
module.exports = [
    {
        // Specify the entry point for our app.
        entry: [path.join(__dirname, "dist/lib/sqs.js")],
            // Specify the output file containing our bundled code.
        output: {
            path: path.join(__dirname, "dist/browser/aws-sqs/"),
            filename: 'aws-sqs.js',
            libraryTarget: 'var',
            library: 'AWSSQS'
        },
        // Enable WebPack to use the 'path' package.
        resolve:{
            fallback: { path: require.resolve("path-browserify")}
        }
    },
    {
        // Specify the entry point for our app.
        entry: [path.join(__dirname, "dist/lib/AWSProvider.js")],
            // Specify the output file containing our bundled code.
        output: {
            path: path.join(__dirname, "dist/browser/aws-provider/"),
            filename: 'aws-provider.js',
            libraryTarget: 'var',
            library: 'AWSProvider'
        },
        // Enable WebPack to use the 'path' package.
        resolve:{
            fallback: { path: require.resolve("path-browserify")}
        }
    }
];