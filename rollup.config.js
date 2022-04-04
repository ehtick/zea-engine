import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import dts from 'rollup-plugin-dts'
import svg from 'rollup-plugin-svg'
import { terser } from 'rollup-plugin-terser'
import webWorkerLoader from 'rollup-plugin-web-worker-loader'
import { base64 } from 'rollup-plugin-base64'
import glslify from 'rollup-plugin-glslify'

// import typescript from '@rollup/plugin-typescript' // TODO: remove if typescript2 is better
// import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const isProduction = !process.env.ROLLUP_WATCH

const glslOptions = {
  // Default
  include: ['**/*.vs', '**/*.fs', '**/*.vert', '**/*.frag', '**/*.glsl'],
  // Undefined by default
  exclude: 'node_modules/**',
  // Compress shader by default using logic from rollup-plugin-glsl -- need to update parser to use this option -- it removes newlines
  compress: false,
}

const plugins = [
  base64({ include: '**/*.wasm' }),
  nodePolyfills(),
  resolve({
    browser: true,
    preferBuiltins: false,
  }),
  json(),
  webWorkerLoader({
    targetPlatform: 'browser',
  }),
  svg(),
  glslify(glslOptions),
]

const input = 'dist/index.js'

const esConfig = {
  input,
  output: [
    { file: pkg.main, format: 'cjs' },
    {
      file: pkg.browser,
      format: 'es',
    },
  ],
  plugins,
}

const umdConfig = {
  input,
  output: {
    name: 'zeaEngine',
    file: pkg.umd,
    format: 'umd',
  },
  plugins,
}

const umdMinConfig = {
  input,
  output: {
    name: 'zeaEngine',
    file: pkg['umd.min'],
    format: 'umd',
  },
  plugins: [...plugins, terser()],
}

const typesConfig = {
  input: './dist/index.d.ts',
  output: [{ file: './dist/zea-engine.d.ts', format: 'es' }],
  plugins: [json(), dts()],
}

const devConfig = [umdConfig, typesConfig]
const prodConfig = [esConfig, umdMinConfig, ...devConfig]

const finalConfig = isProduction ? prodConfig : devConfig

export default finalConfig
