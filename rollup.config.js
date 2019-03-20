import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import prettier from 'rollup-plugin-prettier'
import {terser} from 'rollup-plugin-terser'

const prettierConfig = {
  ...require('./prettier.config'),
  parser: 'babel',
  singleQuote: true,
}

const plugins = [
  babel(),
  prettier({
    ...prettierConfig,
    sourceMap: true,
  }),
  filesize(),
]

const minify = [babel(), terser(), filesize()]

const moduleName = 'getOrientation'

const builds = {
  input: 'src/index.js',
  output: [
    // umd build
    {
      file: 'lib/index.js',
      format: 'umd',
      name: moduleName,
      sourcemap: true,
    },
    // umd build
    {
      file: 'lib/index.common.js',
      format: 'cjs',
      sourcemap: true,
    },
    // esm build
    {
      file: 'lib/index.mjs',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins,
}

const minifiedBuilds = {
  ...builds,
  output: builds.output
    .filter(({format}) => format !== 'cjs')
    .map(config => ({
      ...config,
      file: config.file.replace(/(\.m?js)$/, '.min$1'),
    })),
  plugins: minify,
}

export default [builds, minifiedBuilds]
