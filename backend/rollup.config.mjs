import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import esbuild from 'rollup-plugin-esbuild';

export default [
  {
    input: 'index.js',
    output: {
      sourcemap: true,
      file: 'dist/index.cjs',
      format: 'cjs'
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
        /*
         * Error: Cannot find module 'pg-native' 対策
         * https://github.com/brianc/node-postgres/issues/1906
         * 追加参考サイト
         * https://github.com/brianc/node-postgres/issues/838
         * そもそも Windows で pg-native を入れるのは大変
         * https://github.com/brianc/node-pg-native/issues/50
        */
        ignore: ['pg-native']// , './native']
      }),
      babel({ babelHelpers: 'bundled' }),
      json(),
      esbuild({
        minify: true,
        target: 'node16'
      })
    ]
  },
  {
    input: 'table-maintenance/Import-from-australia.js',
    output: {
      file: 'dist/Import-from-australia.cjs',
      format: 'cjs'
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
        ignore: ['pg-native']
      }),
      babel({ babelHelpers: 'bundled' }),
      json()
    ]
  },
  {
    input: 'table-maintenance/Import-from-libya.js',
    output: {
      file: 'dist/Import-from-libya.cjs',
      format: 'cjs'
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
        ignore: ['pg-native']
      }),
      babel({ babelHelpers: 'bundled' }),
      json()
    ]
  },
  {
    input: 'table-maintenance/Import-from-tanzania.js',
    output: {
      file: 'dist/Import-from-tanzania.cjs',
      format: 'cjs'
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
        ignore: ['pg-native']
      }),
      babel({ babelHelpers: 'bundled' }),
      json()
    ]
  }
];
