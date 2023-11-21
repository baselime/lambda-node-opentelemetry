module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-syntax-flow",
    "@babel/plugin-transform-flow-strip-types",
    "@babel/plugin-proposal-optional-chaining",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true,
      }
    ],
    "transform-class-properties",
    [
      "module-resolver",
      {
        "alias": {
          "@": "."
        }
      }
    ]
  ],
};