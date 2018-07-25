const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
  output: {
    file: 'js-time.min.js',
    format: 'cjs',
  },
};
