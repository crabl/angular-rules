var gulp = require('gulp');
var karma = require('gulp-karma');
var $ = require('gulp-load-plugins')();

gulp.task('build', function () {
	return gulp.src('lib/**/*.ts')
			   .pipe($.tslint())
			   .pipe($.tslint.report('prose', { emitError: false }))
			   .pipe($.typescript())
			   .pipe(gulp.dest('dist/'))
			   .pipe($.size());
});

gulp.task('test', function() {
  // Be sure to return the stream 
  return gulp.src(['dist/*.js', 'test/*.spec.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) { 
      throw err;
    });
});
 
//gulp.task('watch', function () {
//	// build
//});
//
//gulp.task('tdd', ['watch'], function() {
//  gulp.src(testFiles)
//    .pipe(karma({
//      configFile: 'karma.conf.js',
//      action: 'watch'
//    }));
//});