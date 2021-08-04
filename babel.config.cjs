module.exports = {
  presets: [
    [
      '@babel/env',
      {
        // debug: true,
        // useBuiltIns: 'usage',
        modules: false,
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
