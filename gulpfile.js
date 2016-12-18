var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

gulp.task('scss_task', function(){
  return gulp.src('scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream())
});

gulp.task('jsTask', function(){
  return gulp.src('js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
});

gulp.task('synchro', ['scss_task'], function(){
  browserSync.init({server: "./"})

  gulp.watch("./scss/**/*.scss", ['scss_task']);
  gulp.watch("./*.html").on('change', browserSync.reload);
  gulp.watch("js/*.js").on('change', browserSync.reload);
});

gulp.task('default', ['synchro']);
