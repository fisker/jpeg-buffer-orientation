import {babel as rollupPluginBabel} from '@rollup/plugin-babel'
import rollupPluginPrettier from 'rollup-plugin-prettier'
import {terser as rollupPluginTerser} from 'rollup-plugin-terser'
import createEsmUtils from 'esm-utils'

const {require} = createEsmUtils(import.meta)

const prettierConfig = {
  ...require('./prettier.config.cjs'),
  parser: 'babel',
  singleQuote: true,
}

const commonPlugins = [rollupPluginBabel()]

const plugins = [
  ...commonPlugins,
  rollupPluginPrettier({
    ...prettierConfig,
    sourcemap: true,
  }),
]

const minify = [...commonPlugins, rollupPluginTerser()]

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
    // CommonJS build
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
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
