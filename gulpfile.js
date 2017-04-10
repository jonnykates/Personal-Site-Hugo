'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('compile', function() {
  console.log('compiling...');
  return gulp.src('./themes/jfk/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer("last 5 versions"))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./themes/jfk/static/css/'))
});

gulp.task('watch', function() {
  gulp.watch('./themes/jfk/scss/*.scss', ['compile']);
});