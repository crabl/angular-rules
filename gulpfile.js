var gulp = require('gulp');
var karma = require('gulp-karma');
var wiredep = require('wiredep');

var $ = require('gulp-load-plugins')();

var testFiles = ['dist/*.js', 'test/*.spec.js'];
var srcFiles = 'lib/**/*.ts';
var wiredepOptions = {
    dependencies: true,
    devDependencies: true
};

gulp.task('build', function () {
	return gulp.src(srcFiles)
			   .pipe($.tslint())
			   .pipe($.tslint.report('prose', { emitError: false }))
			   .pipe($.typescript())
			   .pipe(gulp.dest('dist/'))
			   .pipe($.size());
});

gulp.task('watch', function () {
  gulp.watch(srcFiles, ['build']);
});

gulp.task('test', function() {
  // Be sure to return the stream 
  var bowerDeps = wiredep(wiredepOptions);
  
  return gulp.src(bowerDeps.js.concat(testFiles))
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) { 
      throw err;
    });
});

gulp.task('tdd', ['watch'], function() {
  var bowerDeps = wiredep(wiredepOptions);
  
  return gulp.src(bowerDeps.js.concat(testFiles))
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('default', ['tdd']);