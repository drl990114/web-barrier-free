import ts from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

export default {
  input: './src/index.ts',
  output: [
    {
      name: 'wbf',
      file: 'dist/wbf.umd.js',
      format: 'umd',
      sourcemap: true
    },
    {
      name: 'wbf',
      file: 'dist/wbf.esm-bundler.js',
      format: 'es'
    }
  ],
  plugins: [
    ts({ declaration: false, module: 'ES6' }),
    resolve(),
    postcss()
  ]
}
