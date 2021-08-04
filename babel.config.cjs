module.exports = {
  assumptions: {
    setSpreadProperties: true,
  },
  exclude: [/\/core-js\//],
  compact: 'auto',
  presets: [
    [
      '@babel/env',
      {
        debug: true,
        modules: false,
        corejs: {
          version: 3,
        },
      },
    ],
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: '0.8',
            },
          },
        ],
      ],
    },
  },
}
