import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/main.js',
	output: {
		format: 'cjs',
		file: 'dist/index.js',
	},
	plugins: [
		svelte({
			format: 'cjs',
			customElement: true
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		terser({
			compress: {
				reduce_vars: false,
				sequences: false
			}
		})
	]
};
