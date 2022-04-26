import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import dts from 'rollup-plugin-dts'
import { terser } from 'rollup-plugin-terser'
import webWorkerLoader from 'rollup-plugin-web-worker-loader'
import { base64 } from 'rollup-plugin-base64'
import glslify from 'rollup-plugin-glslify'

import pkg from './package.json'
const isProduction = process.env.BUILD === 'production'

const glslOptions = {
  // Default
  include: ['**/*.vs', '**/*.fs', '**/*.vert', '**/*.frag', '**/*.glsl'],
  // Undefined by default
  exclude: 'node_modules/**',
  // Compress shader by default using logic from rollup-plugin-glsl -- need to update parser to use this option -- it removes newlines
  compress: false,
}

// This is a very simple 'replace' like plugin to
// preproces code to compile for NodeJS.
// The code is modified to avoid creating WebWorkers,
// and instead the main thread runs all code.
const preprocess = (options = { repl: {} }) => {
  return {
    name: 'preprocess-file',
    transform: (code, id) => {
      for (let key in options.repl) {
        code = code.replaceAll(key, options.repl[key])
      }
      return code
    },
  }
}

const plugins = [
  json(),
  typescript({ tsconfig: './tsconfig.json' }),
  base64({ include: '**/*.wasm' }),
  webWorkerLoader({
    targetPlatform: 'browser',
  }),
  glslify(glslOptions),
]

const builds = [
  {
    input: 'src/index.ts',
    output: {
      name: 'zeaEngine',
      file: pkg.umd,
      format: 'umd',
      // sourcemap: true,
    },
    plugins,
  },
]

if (isProduction) {
  builds.push({
    input: 'src/index.ts',
    output: {
      file: pkg.browser,
      format: 'es',
      // sourcemap: true,
    },

    plugins,
  })

  builds.push({
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      // sourcemap: true
    },
    plugins: [
      preprocess({
        repl: {
          '/* NODE_START': '// NODE_START',
          '// NODE_ELSE */': '/* NODE_ELSE //',
          '// NODE_END': 'NODE_END */',
        },
      }),
      ...plugins,
    ],
  })

  builds.push({
    input: 'src/index.ts',
    output: {
      name: 'zeaEngine',
      file: pkg['umd.min'],
      format: 'umd',
      // sourcemap: true,
    },
    plugins: [...plugins, terser()],
  })

  builds.push({
    input: './src/index.ts',
    output: [{ file: './dist/zea-engine.d.ts', format: 'es' }],
    plugins: [json(), dts()],
  })
}

export default builds
