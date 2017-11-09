module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "function-paren-newline": [0],
        "import/no-extraneous-dependencies" : ["error", {"devDependencies": true}],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/extensions": [0],
    },
    globals: {
        document: true,
    }
};