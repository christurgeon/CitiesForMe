module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "2017",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["babel", "react", "import", "prettier","react-hooks"],
  rules: {
    "import/no-duplicates": "error",
    "import/no-unresolved": "error",
    "import/named": "error",
    "prettier/prettier": "error",
    "react/no-typos": "error",
    "react/no-unused-state": "error",
    "react/jsx-no-bind": "error",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-array-index-key": "off", // Allow the use of indices as keys
    "react/forbid-prop-types": "off", // Allow use of ambiguous prop types
    "array-callback-return": "error",
    "consistent-return": "error",
    "babel/no-invalid-this": "error",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-plusplus": "off",
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
      flowVersion: "0.63.1",
    },
  },
};
