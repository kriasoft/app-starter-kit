// For more information on how to configure a task runner, please visit:
// https://github.com/gulpjs/gulp

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var clean       = require('gulp-clean');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var less        = require('gulp-less');
var csso        = require('gulp-csso');
var es          = require('event-stream');
var livereload  = require('gulp-livereload');
var lr          = require('tiny-lr');
var server      = lr();
var path        = require('path');
var embedlr     = require("gulp-embedlr");
var express     = require('express');


//creating servers for both livereload and static files

var staticFileServer = function(port) {

    var app = express();
    app.use(express.static(path.resolve('./dist')));
    app.listen(port, function() {
        gutil.log('Listening on http://localhost:'+port);
    });

    return {
        app: app
    };
};

var staticServer = staticFileServer(8080);



gulp.task('clean', function() {
    // Clear the destination folder
    gulp.src('dist/**/*.*', { read: false })
        .pipe(clean());
});

gulp.task('copy', function () {
    // Copy all application files except *.less and .js into the `dist` folder
    return es.concat(
        gulp.src(['src/img/**'])
            .pipe(gulp.dest('dist/img')),
        gulp.src(['src/js/vendor/**'])
            .pipe(gulp.dest('dist/js/vendor')),
        gulp.src(['src/*.*'])
            .pipe(gulp.dest('dist'))
    );
});

gulp.task('scripts', function () {
    // Concatenate, minify and copy all JavaScript (except vendor scripts)
    return gulp.src(['src/js/**/*.js', '!src/js/vendor/**'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function () {
    // Compile LESS files
    return gulp.src('src/less/app.less')
        .pipe(less())
        .pipe(rename('app.css'))
        .pipe(csso())
        .pipe(gulp.dest('dist/css'))
        //you must add this line to trigger livereload
        .pipe(livereload(server));
});




// The dist task (used to store all files that will go to the server)
gulp.task('dist', function () {
    gulp.run('clean', 'copy', 'scripts', 'styles');
});

// The default task (called when you run `gulp`)
gulp.task('default',function () {

    gulp.run('dist');

    // Listen on port 35729
    server.listen(35729, function (err) {
        if (err) {
            return console.log(err)
        };


        // Watch .js files and run tasks if they change
        gulp.watch('src/js/**', function () {
            gulp.run('scripts');
        });

        // Watch .less files and run tasks if they change
        gulp.watch('src/less/**/*.less', function () {
            gulp.run('styles');
        });

        gulp.src("./src/*.html")
            .pipe(embedlr())
            .pipe(gulp.dest("./dist"));
    });
});
