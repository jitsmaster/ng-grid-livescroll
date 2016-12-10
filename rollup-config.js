import rollup from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify'

export default {
	entry: 'src/ng2grid.module.js',
	dest: 'dist/ng2grid.js', // output a single application bundle
	sourceMap: false,
	format: 'iife',
	moduleName: "ng2grid",
	plugins: [
		nodeResolve({ jsnext: true, module: true }),
		commonjs({
			include: ['node_modules/rxjs/**', 'node_modules/ng2-bootstrap/**'],
			namedExports: {
				// left-hand side can be an absolute path, a path
				// relative to the current directory, or the name
				// of a module in node_modules
				'node_modules/ng2-bootstrap/ng2-bootstrap.js': ['positionService']
			}
		})/*,
		uglify({
			"keep-fnames" : true
		})*/
	]
}
