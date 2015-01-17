var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-ruby-sass'),
    ugly = require('gulp-uglify');

gulp.task('minjs', function(){
    gulp.src('js/*.js')
    .pipe(ugly())
    .pipe(gulp.dest('js/min'))
    .pipe(connect.reload())
    ;
});

// gulp.task('sass', function(){
//     gulp.src('sass/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dist('css/main.css'));
// });

gulp.task('connect', function(){
    connect.server({
        livereload: true,
        port: 1337
    });
});

gulp.task('default', ['connect'], function(){
    gulp.watch(['sass/*.scss', 'js/main-2.js'], ['minjs']);

});
