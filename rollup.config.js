import babel from 'rollup-plugin-babel';

export default {
  entry: './src/index',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  format: 'cjs'
};
