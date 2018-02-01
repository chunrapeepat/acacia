const path = require('path')
const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const headerComment = require('gulp-header-comment')

gulp.task('build-full', function() {
  build({
    src: './src/build-full.scss',
    prefix: 'acacia',
  })
})

gulp.task('development', function() {
    gulp.watch('src/*.scss', ['build-full'])
})

function build({ src = '', prefix = '', basename = '' }) {
  gulp
    .src(src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(headerComment({
        file: path.join(__dirname, "header.txt"),
        encoding: 'utf-8',
    }))
    .pipe(
      rename({
        basename,
        prefix,
        suffix: '.min',
        extname: '.css'
      })
    )
    .pipe(gulp.dest('./dist/'))
}