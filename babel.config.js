const config = {
    "presets": ["@babel/env", "@babel/preset-react"],
    "env": {
        "test": {
            "plugins": [
                "transform-es2015-modules-commonjs",
                "dynamic-import-node"
            ]
        }
    },
    "plugins": [
        "transform-class-properties",
        "transform-es2015-modules-commonjs",
        "@babel/plugin-proposal-object-rest-spread"
    ]
}

module.exports = config;
