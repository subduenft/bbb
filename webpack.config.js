module.exports = {
    // ...
    resolve: {
        fallback: {
            crypto: require.resolve("crypto-browserify")
        }
    },

    resolve: {
        fallback: {
            stream: require.resolve('stream-browserify')
        }
    },

    plugins: [
        new NodePolyfillPlugin({
        crypto: true
        })
    ],

};


