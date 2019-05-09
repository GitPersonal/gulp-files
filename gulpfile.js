const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');

/* TOP LEVEL FUNCTIONS

gulp.task - define tasks
gulp.src - point files to use
gulp.dest - points to folder to output
gulp.watch - watch files and folders for changes
*/

// Logs Message
gulp.task('message', function () {
    return console.log('Gulp is running ...');
});

// Copy all html files
gulp.task('copyHtml', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});


// Optimize Images
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);


// Minify JS
gulp.task('minify', function () {
    gulp.src('src/js/*.js')
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// Compile Sass
gulp.task('sass', function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
});

// Minify css
gulp.task('cleanCss', function () {
    gulp.src('dist/css/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css/min'))
})


// Concat Scripts
// grabbed the minify from minify task
gulp.task('scripts', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts', 'cleanCss']);

gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
})
