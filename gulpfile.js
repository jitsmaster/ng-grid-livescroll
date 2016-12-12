/*
Angular AOT Compiler: NGC-Rollup build system
This gulp script cannot be called from VS 2015. It must be invoked via
node.js gulp command from site migrator 9 root folder.

prerequesits:
>npm install gulp -g

For compressed build:
>gulp default

For debug build:
>gulp build-debug
*/
var gulp = require('gulp');
var exec = require('child_process').exec;
var del = require('del');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var pkg = require('./package.json');
var typescript = require('gulp-typescript');
var tscConfig = require('./tsconfig.json');
var tsconfig = require('tsconfig-glob');
var gulpPlugins = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rollup = require('gulp-rollup');
var less = require('gulp-less');

// clean the contents of the distribution directory
gulp.task('clean', function () {
	return del(['dist/**/*']);
});

// copy dependencies
gulp.task('concat:libs', ['clean'], function () {
	return gulp.src([
				"node_modules/core-js/client/shim.min.js",
				"node_modules/systemjs/dist/system.js",
				"node_modules/zone.js/dist/zone.js",
				"node_modules/reflect-metadata/Reflect.js",
				"node_modules/bootstrap/dist/js/bootstrap.js"
	])
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/ng2'));
});
gulp.task('concat-debug:libs', ['clean'], function () {
	return gulp.src([
				"node_modules/core-js/client/shim.min.js",
				"node_modules/systemjs/dist/system.js",
				"node_modules/zone.js/dist/zone.js",
				"node_modules/reflect-metadata/Reflect.js",
				"node_modules/bootstrap/dist/js/bootstrap.js"
	])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('dist/ng2'));
});

//linting
gulp.task('tslint', function () {
	return gulp.src('ngscripts/**/*.ts')
	  .pipe(gulpPlugins.tslint())
	  .pipe(gulpPlugins.tslint.report('verbose'));
});

gulp.task('less', function () {
  return gulp.src('./src/components/templates/awgrid.less')
    .pipe(less({}))
    .pipe(gulp.dest('./src/components/templates'));
});

gulp.task('compileDef', function(cb) {
	// //in order to bundle with module name, have to manually create config
	// var manualConfig = typescript.createProject('tsconfig.json', {
	// 	"module": "commonjs",
	// 	"experimentalDecorators": true,
	// 	"emitDecoratorMetadata": true,
	// 	"target": "es5"
	// });

	// return gulp
	// 	.src(tscConfig.files, { base: "./" })
	// 	// .pipe(gulpPlugins.inlineNg2Template({ useRelativePaths: true }))
	// 	.pipe(manualConfig())
	// 	// .pipe(uglify())
	// 	.pipe(gulp.dest('.'));

	exec('"node_modules\\.bin\\ngc" -p tsconfig.json', function (err, stdout, stderr) {
		console.log(stdout);
		//console.log(stderr);
		cb(err);
	});
});

// TypeScript compile
gulp.task('compile', ['clean', 'less', 'compileDef'], function (cb) {

	////in order to bundle with module name, have to manually create config
	//var manualConfig = typescript.createProject('tsconfig.json', {
	//	"module": "commonjs",
	//	"experimentalDecorators": true,
	//	"emitDecoratorMetadata": true,
	//	"target": "es5"
	//});

	//return gulp
	//	.src(tscConfig.files, { base: "./" })
	//	.pipe(gulpPlugins.inlineNg2Template({ useRelativePaths: true }))
	//	.pipe(manualConfig())
	//	.pipe(uglify())
	//	.pipe(gulp.dest('.'));


	exec('"node_modules\\.bin\\ngc" -p tsconfig_aot.json', function (err, stdout, stderr) {
		console.log(stdout);
		//console.log(stderr);
		cb(err);
	});
});

gulp.task('compile-test', ['clean', 'less'], function (cb) {

	////in order to bundle with module name, have to manually create config
	//var manualConfig = typescript.createProject('tsconfig.json', {
	//	"module": "commonjs",
	//	"experimentalDecorators": true,
	//	"emitDecoratorMetadata": true,
	//	"target": "es5"
	//});

	//return gulp
	//	.src(tscConfig.files, { base: "./" })
	//	.pipe(gulpPlugins.inlineNg2Template({ useRelativePaths: true }))
	//	.pipe(manualConfig())
	//	.pipe(uglify())
	//	.pipe(gulp.dest('.'));


	exec('"node_modules\\.bin\\ngc" -p tsconfig_aot_test.json', function (err, stdout, stderr) {
		console.log(stdout);
		//console.log(stderr);
		cb(err);
	});
});

// update the tsconfig files based on the glob pattern
gulp.task('tsconfig-glob', function () {
	return tsconfig({
		configPath: '.',
		indent: 2
	});
});

gulp.task('build', ['tslint', 'compile', 'concat-debug:libs'], function (cb) {
	//var b = browserify("./ngscripts/main.js", {
	//	debug: true
	//})

	//return b.bundle()
	//	.pipe(source('migrator.js'))
	//	.pipe(buffer())
	//	.pipe(uglify())
	//	.pipe(gulp.dest('./dist'));

	exec('"node_modules\\.bin\\rollup" -c rollup-config.js', function (err, stdout, stderr) {
		console.log(stdout);
		//console.log(stderr);
		cb(err);
	});
});

gulp.task('build-debug', ['tslint', 'compile', 'concat-debug:libs'], function (cb) {
	//var b = browserify("./ngscripts/main.js", {
	//	debug: true
	//})

	//return b.bundle()
	//	.pipe(source('migrator.js'))
	//	.pipe(buffer())
	//	.pipe(gulp.dest('./dist'));

	exec('"node_modules\\.bin\\rollup" -c rollup-config-debug.js', function (err, stdout, stderr) {
		console.log(stdout);
		//console.log(stderr);
		cb(err);
	});
});

gulp.task('build-test', ['tslint', 'compile-test', 'concat-debug:libs'], function (cb) {
	//var b = browserify("./ngscripts/main.js", {
	//	debug: true
	//})

	//return b.bundle()
	//	.pipe(source('migrator.js'))
	//	.pipe(buffer())
	//	.pipe(gulp.dest('./dist'));

	exec('"node_modules\\.bin\\rollup" -c rollup-config-test.js', function (err, stdout, stderr) {
		console.log(stdout);
		//console.log(stderr);
		cb(err);
	});
});

//gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['build']);

gulp.task('watch', ['build'], function () {
	return gulp.watch('ngscripts/**/*.ts', ['build-debug']);
})