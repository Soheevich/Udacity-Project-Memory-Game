const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');

gulp.task('compress', () =>
  gulp
    .src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts')));

// Compile Sass
gulp.task('sass', () =>
  gulp
    .src(['src/scss/*.scss'])
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest('build/styles')));

// Watch
gulp.task('watch-css', ['sass'], () => {
  gulp.watch(['src/scss/*.scss'], ['sass']);
});

// Default
gulp.task('default', ['watch-css']);
