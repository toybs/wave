var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    del = require('del'),
    pkg = require('./package.json');

var paths = {
    // html: 'src/**/*.html',
    // scss: 'src/**/*.scss',
    js: 'src/**/*.js'
};

gulp.task('clean', function() {
    del(['dist/*.js','../wave_front/js/dist/*.js'], {force: true})
});

gulp.task('combine-js', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat(pkg.name+'.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('../wave_front/js/dist/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.js, ['combine-js'])
});

gulp.task('default', []);
gulp.task('build', ['clean', 'combine-js', 'watch']);