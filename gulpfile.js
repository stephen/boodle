var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var rimraf = require('rimraf');
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');

var instance = {};
var paths = {
  scripts: ['lib/*', 'lib/**/*'],
  tests: ['tests/*', 'tests/**/*']
};

gulp.task('scripts-lib', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(traceur({
      blockBinding: 'parse',
      generators: 'parse',
      promises: 'parse'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/bin'));
});

gulp.task('scripts-tests', function() {
  return gulp.src(paths.tests)
    .pipe(sourcemaps.init())
    .pipe(traceur({
      blockBinding: 'parse',
      generators: 'parse',
      promises: 'parse'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/tests'));
});

gulp.task('scripts', ['scripts-lib', 'scripts-tests']);

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint({
      esnext: true
    }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function(cb) {
  rimraf('build/', cb);
});

gulp.task('dev-test', ['build'], function() {
  instance.nodemon = nodemon({
    script: 'build/tests/',
    ignore: ['*', '**/*'],
    nodeArgs: ['--harmony']
  });
});

gulp.task('watch', function() {
  gulp.watch([
    paths.scripts,
    paths.tests
  ], ['build', function() {
    instance.nodemon.emit('restart');
  }]);
});

gulp.task('test', ['dev-test', 'watch']);

gulp.task('build', ['scripts', 'lint']);
gulp.task('default', ['build', 'watch']);
