import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const isProduction = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/index.min.js',
    format: 'iife',
    name: '$infiniteLoader',
  },
  plugins: [
    typescript(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    isProduction && terser({ format: { comments: false } }),
    !isProduction && serve() && livereload({ watch: ['dist', 'pages', 'index.html'] }),
  ],
}
