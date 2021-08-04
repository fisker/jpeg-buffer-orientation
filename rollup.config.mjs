import {babel} from '@rollup/plugin-babel'
import prettier from 'rollup-plugin-prettier'
import {terser} from 'rollup-plugin-terser'
import createEsmUtils from 'esm-utils'

const {require} = createEsmUtils(import.meta)

const prettierConfig = {
  ...require('./prettier.config.cjs'),
  parser: 'babel',
  singleQuote: true,
}

const plugins = [
  babel(),
  prettier({
    ...prettierConfig,
    sourcemap: true,
  }),
]

const minify = [babel(), terser()]

const moduleName = 'getOrientation'

const builds = {
  input: 'src/index.js',
  output: [
    // umd build
    {
      file: 'dist/index.js',
      format: 'umd',
      name: moduleName,
      sourcemap: true,
    },
    // umd build
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    // esm build
    {
      file: 'dist/index.mjs',
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
    .map((config) => ({
      ...config,
      file: config.file.replace(/(\.m?js)$/, '.min$1'),
    })),
  plugins: minify,
}

export default [builds, minifiedBuilds]
