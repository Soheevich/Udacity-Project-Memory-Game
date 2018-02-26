const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');

gulp.task('default', () =>
  gulp
    .src('.src/app.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest('./build/styles')));

gulp.task('css', () => gulp
  .src('./src/*.css')
  .pipe(postcss())
  .pipe(gulp.dest('./build/styles')));

gulp.task('compress', () =>
  gulp
    .src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts')));
