const config = {
    "presets": ["@babel/env", "@babel/preset-react"],
    "env": {
        "test": {
            "plugins": ["transform-es2015-modules-commonjs", "dynamic-import-node"]
        }
    },
    "plugins": [
        "transform-class-properties",
        "syntax-dynamic-import",
    ]
}

module.exports = config;
