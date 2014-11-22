var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rimraf = require('rimraf');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');

var instance = {};
var paths = {
  scripts: ['lib/*.js', 'lib/**/*.js']
}

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(traceur({
      blockBinding: 'parse',
      generators: 'parse',
      promises: 'parse'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('bin'));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint({
      esnext: true
    }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function(cb) {
  rimraf('bin/', cb);
});

gulp.task('watch', function() {
  gulp.watch([paths.scripts], ['build']);
});

gulp.task('playground', function() {
  gulp.watch([paths.scripts], ['build']);
});

gulp.task('build', ['scripts', 'lint']);
gulp.task('default', ['build', 'watch']);
