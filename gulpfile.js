var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');


gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./show/"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('styles', function(){
  gulp.src(['home/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('show/styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('show/styles/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('appscripts', function(){
  return gulp.src('home/js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('show/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('show/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('bowerscripts', function() {
  return gulp.src('./bower_components/**/*.js')
    .pipe(concat('bower.js'))
    // .pipe(gulp.dest('home/js/'))
    .pipe(gulp.dest('show/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('copyHtml', function() {
  return gulp.src('home/**/*.html')
    .pipe(gulp.dest('show/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('images', function() {
  return gulp.src('home/img/**/*')
    .pipe(gulp.dest('show/img/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], function(){
  gulp.run('styles','bowerscripts','appscripts','copyHtml', 'images');
  gulp.watch("home/styles/**/*.scss", ['styles']);
  gulp.watch("home/images/**/*", ['images']);
  gulp.watch("home/js/**/*.js", ['appscripts']);
  gulp.watch("home/**/*.html", ['copyHtml']);
});
