const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const pump = require('pump');
const uglifyjs = require('uglify-es');

const composer = require('gulp-uglify/composer');

const minify = composer(uglifyjs, console);

gulp.task('compress', (cb) => {
  const options = {};
  pump(
    [gulp.src('src/scripts/*.js'),
      minify(options),
      rename({ suffix: '-min' }),
      gulp.dest('build/scripts')],
    cb,
  );
});

// Compile Sass
gulp.task('sass', () =>
  gulp
    .src(['src/scss/*.scss'])
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest('build/styles')));

// Watch
gulp.task('watch-css-js', ['sass', 'compress'], () => {
  gulp.watch(['src/scss/*.scss'], ['sass']);
  gulp.watch(['src/scripts/*.js'], ['compress']);
});

// Default
gulp.task('default', ['watch-css-js']);
