module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "amd": true
    },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "react/prop-types": "off",
      "no-console": "off",
      "no-unused-vars":1
    }
};
