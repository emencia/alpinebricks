import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const isProduction = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/store.ts',
    output: {
      file: 'dist/index.min.js',
      format: 'iife',
      name: '$autocomplete',
    },
    plugins: [
      typescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs({
        extensions: ['.js'],
        sourceMap: false,
        ignoreGlobal: false
      }),
      isProduction && terser({ format: { comments: false } }),
      !isProduction && serve() && livereload({ watch: ['src', 'index.html'] }),
    ],
  },
  {
    input: 'src/store.ts',
    output: {
      file: 'dist/index.js',
      format: 'iife',
      name: '$autocomplete',
    },
    plugins: [
      typescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs({
        extensions: ['.js'],
        sourceMap: false,
        ignoreGlobal: false
      }),
      !isProduction && serve() && livereload({ watch: ['src', 'index.html'] }),
    ],
  },
  {
    input: 'src/main.es.ts',
    output: {
      file: 'dist/index.es.js',
      format: 'es',
    },
    plugins: [
      typescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      //isProduction && terser({ format: { comments: false } }),
    ],
  },
]
