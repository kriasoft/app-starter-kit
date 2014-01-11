// For more information on how to configure a task runner, please visit:
// https://github.com/gulpjs/gulp

var gulp   = require('gulp'),
    clean  = require('gulp-clean'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    less   = require('gulp-less');

gulp.task('clean', function() {
    gulp.src('src/dist/**/*.*', { read: false })
        .pipe(clean());
});

gulp.task('copy', function () {
    // Copy vendor scripts
    return gulp.src(['src/**', '!src/less/**', '!src/js/**', 'src/js/vendor/**'])
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
    // Concatenate, minify and copy all JavaScript (except vendor scripts)
    return gulp.src(['src/js/**/*.js', '!src/js/vendor/**'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function () {
    return gulp.src('src/less/app.less')
        .pipe(less())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('dist/css'));
});

// The default task (called when you run `gulp`)
gulp.task('default', function () {
    gulp.run('clean', 'copy', 'scripts', 'styles');

    // Watch .js files and run tasks if they change
    gulp.watch('src/js/**', function () {
        gulp.run('scripts');
    });

    // Watch .less files and run tasks if they change
    gulp.watch('src/less/**/*.less', function () {
        gulp.run('styles');
    });
});